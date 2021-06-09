from flask import Flask, request, jsonify, render_template
from flask.json import JSONEncoder
from flask_cors import CORS

import os
import joblib
from pathlib import Path
import numpy as np

from utils.bring_model import model
from utils.utils import *

app = Flask(__name__)
base_dir = os.path.dirname(Path(__file__))

CORS(app)


@app.route('/test', methods=['POST'])
def test():
    input_dict = request.get_json()
    # print("input_dict ===========================================> ",input_dict)
    # print({key: type(val) for key,val in input_dict.items()})
    input_x = make_input_matrix(input_dict)
    model.summary()
    # print("input_x ===========================================> ", input_x)
    joblib.dump(input_x, 'temp.joblib')
    pred = model.predict(input_x)
    # print("pred ===========================================> ", pred)

    top_k = 5
    output_example = {}
    output_example['diag_all'] = {}
    output_example['diag_all']['list_prob'] = [float(i) for i in list(
        pred['diag_all'][0][np.argsort(pred['diag_all'][0])[::-1][:top_k]])]
    output_example['diag_all']['list_pred'] = list(
        output_pipe['kcd@code'].classes_[np.argsort(pred['diag_all'][0])[::-1][:top_k]])
    output_example['tbi'] = float(pred['tbi_binary'][0][0])
    output_example['ich'] = float(pred['ich_binary'][0][0])
    output_example['op'] = float(pred['emrt_op'][0][0])
    output_example['emrt'] = {}
    output_example['emrt']['list_prob'] = [float(i) for i in list(
        pred['emrt_emrt'][0][np.argsort(pred['emrt_emrt'])[0][::-1]])]
    output_example['emrt']['list_pred'] = list(
        output_pipe['emrt@output'].steps[1][1].categories_[0][np.argsort(pred['emrt_emrt'])[0][::-1]])
    print(output_example)
    return {"status": 200, "output_data": output_example}


app.run(debug=True)