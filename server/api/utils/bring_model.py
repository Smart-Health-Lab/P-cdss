import tensorflow as tf
from pathlib import Path
import os

base_dir = os.path.join(Path(__file__).parent, '../')


class CustomBinaryCrossentropy(tf.keras.losses.Loss):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)

    def call(self, y_true, y_pred):
        weights_v = tf.where(tf.equal(y_true, 1), 10, 1)
        return tf.multiply(tf.keras.losses.binary_crossentropy(y_true, y_pred), tf.squeeze(tf.cast(weights_v, y_pred.dtype)))


input_shapes = {'age': 1, 'cm_breath': 1, 'cm_dp': 1, 'cm_pc': 1, 'cm_sp': 1, 'cm_tmpt': 1, 'time_took': 1, 'cm_gcs_e': 6, 'cm_gcs_m': 8, 'cm_gcs_v': 7, 'cm_avpu': 5, 'alco': 5, 'on_month': 13, 'on_weekday': 8, 'on_hour': 25, 'in_month': 12, 'in_weekday': 8,
                'in_hour': 25, 'intent': 5, 'method': 9, 'mech': 114, 'place1': 39, 'place2': 3, 'place3': 29, 'factor_u': 720, 'iact': 10, 'sexx': 2, 'mech_higher': 12, 'place1_higher': 14, 'factor_u_higher': 154, 'factor_u_highest': 24, 'sympu_terms': 11219}

output_config = {
    'diag_all': {'shape': 289, 'activation_fn': 'sigmoid', 'input_name': 'diag', 'loss': 'binary_crossentropy'},
    'head_binary': {'shape': 1, 'activation_fn': 'sigmoid', 'input_name': 'diag', 'loss': 'binary_crossentropy'},
    'tbi_binary': {'shape': 1, 'activation_fn': 'sigmoid', 'input_name': 'diag', 'loss': 'binary_crossentropy'},
    'tbi_acute_binary': {'shape': 1, 'activation_fn': 'sigmoid', 'input_name': 'diag', 'loss': 'binary_crossentropy'},
    'tbi_late_effect_binary': {'shape': 1, 'activation_fn': 'sigmoid', 'input_name': 'diag', 'loss': 'binary_crossentropy'},
    's06_binary': {'shape': 1, 'activation_fn': 'sigmoid', 'input_name': 'diag', 'loss': 'binary_crossentropy'},
    'ich_binary': {'shape': 1, 'activation_fn': 'sigmoid', 'input_name': 'diag', 'loss': CustomBinaryCrossentropy()},
    'emrt_emrt': {'shape': 6, 'activation_fn': 'softmax', 'input_name': 'emrt', 'loss': 'categorical_crossentropy'},
    'emrt_op': {'shape': 1, 'activation_fn': 'sigmoid', 'input_name': 'emrt', 'loss': 'binary_crossentropy'}}


def make_pred_model(input_shapes, output_config, sympu_col_name='sympu_terms'):
    # Input layers
    input_layers = {}
    for name, dim in input_shapes.items():
        input_layers[name] = tf.keras.Input(shape=dim, name=name)

    ######
    # Hidden layers - for symptoms
    x = tf.keras.layers.Dense(300, activation='elu', kernel_initializer='he_normal')(
        input_layers[sympu_col_name])
    x = tf.keras.layers.Dropout(0.2)(x)
    x = tf.keras.layers.BatchNormalization()(x)
    # concat others with embedding
    x = tf.keras.layers.concatenate([input_layers[col] for col in input_layers.keys(
    ) if col != sympu_col_name] + [x], axis=1)
    # Hidden layers
    hidden_layers = [512] * 8
    for h_unit in hidden_layers:
        x = tf.keras.layers.Dense(
            256, activation='selu', kernel_initializer='he_normal')(x)
        x = tf.keras.layers.Dropout(0.2)(x)
        x = tf.keras.layers.BatchNormalization()(x)
    # hidden layers for each output
    hidden_layers = {}
    hidden_layers = {
        # for kcd, tbi, head, ich...
        'diag': tf.keras.layers.Dense(32, activation='elu', kernel_initializer='he_normal')(x),
        # for emrt, op, ...
        'emrt': tf.keras.layers.Dense(32, activation='elu', kernel_initializer='he_normal')(x)
    }

    ######
    # Output layers - diagnosis
    def make_output_layer(name, activation_fn, input_layer):
        return tf.keras.layers.Dense(output_config[name]['shape'], activation=activation_fn, name=name)(input_layer)

    output_layers = {name: make_output_layer(
        name, output_config[name]['activation_fn'], hidden_layers[output_config[name]['input_name']]) for name in output_config.keys()}

    model_all = tf.keras.models.Model(
        inputs=input_layers, outputs=output_layers)
#     model_all.compile(loss = {key: output_config[key]['loss'] for key in output_config.keys()}, optimizer = tf.keras.optimizers.Nadam())
    return model_all


model = make_pred_model(input_shapes, output_config)
model.load_weights(os.path.join(base_dir, 'data', 'model',
                                '11_10@checkpoint@auprc@test.hdf'))

# model.save_weights(os.path.join(base_dir, 'data', 'model',
#                                 '11_10@checkpoint@auprc@test.hdf'))
