from pathlib import Path
import os, joblib
import pandas as pd

base_dir = os.path.join(Path(__file__).parent, '../')

num_cols = ['age', 'cm_breath', 'cm_dp', 'cm_pc', 'cm_sp', 'cm_tmpt', 'time_took']
cat_cols = ['cm_gcs_e', 'cm_gcs_m', 'cm_gcs_v', 'cm_avpu', 'alco', 'on_month', 'on_weekday', 'on_hour', 'in_month', 'in_weekday', 'in_hour', 'intent', 'method', 'mech', 'place1', 'place2', 'place3', 'factor_u', 'iact', 'sexx']
higher_cols = ['mech_higher', 'place1_higher', 'factor_u_higher', 'factor_u_highest']
multi_cols = ['sympu_terms'] # sympu_list

input_pipe = joblib.load(os.path.join(base_dir, 'data/ref', 'input_pipe.joblib'))
output_pipe = joblib.load(os.path.join(base_dir, 'data/ref', 'output_pipe.joblib'))
dict_parent = joblib.load(os.path.join(base_dir, 'data/ref', 'dict_parent.joblib'))

weekday_dict = {0:'mon', 1:'tue', 2: 'wed', 3:'thur', 4:'fri', 5:'sat', 6:'sun'}
def make_input_matrix(input_json):
    # datetime
    in_datetime = pd.to_datetime(input_json['in_date'] + ' ' + input_json['in_time'])
    in_month = in_datetime.month
    in_hour = in_datetime.hour
    in_weekday = in_datetime.weekday()
    on_datetime = pd.to_datetime(input_json['on_date'] + ' ' + input_json['on_time'])
    on_month = on_datetime.month
    on_hour = on_datetime.hour
    on_weekday = on_datetime.weekday()
    time_took = (in_datetime - on_datetime) / pd.Timedelta('1 hour')
    input_json['in_month'] = in_month
    input_json['in_hour'] = in_hour
    input_json['on_month'] = on_month
    input_json['on_hour'] = on_hour
    input_json['time_took'] = time_took
    input_json['in_weekday'] = weekday_dict[in_weekday] if in_weekday in weekday_dict.keys() else 'NaT'
    input_json['on_weekday'] = weekday_dict[on_weekday] if on_weekday in weekday_dict.keys() else 'NaT'
    
    # higher cols
    for key1 in dict_parent.keys():
        for key2 in dict_parent[key1].keys():
            if input_json[key1] in dict_parent[key1][key2].keys():
                input_json[key2] = dict_parent[key1][key2][input_json[key1]]
            else:
                input_json[key2] = 'nan'
    # sympu
    input_json['sympu_terms'] = []
    for col in ['sympu1', 'sympu2', 'sympu3', 'sympu4', 'sympu5']:
        if isinstance(input_json[col], str):
            input_json['sympu_terms'] += input_json[col].lower().split()
    input_json['sympu_terms'] = [list(set(input_json['sympu_terms']))]
    # import data
    input_x = {}
    for col in num_cols:
        input_x[col] = input_pipe[col].transform([[float(input_json[col])]]).reshape(1,-1)
    for col in cat_cols:
        input_x[col] = input_pipe[col].steps[1][1].transform([[str(input_json[col])]]).toarray().reshape(1,-1)
    for col in higher_cols:
        input_x[col] = input_pipe[col].steps[1][1].transform([[str(input_json[col])]]).toarray().reshape(1,-1)
    input_x['sympu_terms'] = input_pipe['sympu_terms'].transform(input_json['sympu_terms']).toarray()
    return input_x