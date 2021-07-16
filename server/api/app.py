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


@app.route('/test01', methods=['POST'])
def test01():
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

    # print(output_example)

    return {"status": 200, "output_data": output_example}


@app.route('/test02', methods=['POST'])
def test02():
    input_dict = request.get_json()
    print("test02 routing input data: ", input_dict)

    input_data_dict = {
        "act": input_dict['act'],
        "age": input_dict['age'],
        "bystander_cpr": input_dict['bystander_cpr'],
        "cause_disease": input_dict['cause_disease'],
        "er_defib": input_dict['er_defib'],
        "er_ekg": input_dict['er_ekg'],
        "first_defib_place": input_dict['first_defib_place'],
        "first_ekg_place": input_dict['first_ekg_place'],
        "h_place_public": input_dict['h_place_public'],
        "h_sex": input_dict['h_sex'],
        "pre_er_cpr": input_dict['pre_er_cpr'],
        "pre_er_defib": input_dict['pre_er_defib'],
        "pre_er_ekg": input_dict['pre_er_ekg'],
        "witness": input_dict['witness'],
        "phx_dm": input_dict['phx_dm'],
        "phx_heart": input_dict['phx_heart'],
        "phx_htn": input_dict['phx_htn'],
        "phx_renal": input_dict['phx_renal'],
        "phx_respi": input_dict['phx_respi'],
        "phx_stroke": input_dict['phx_stroke'],
        "phx_dyslipi": input_dict['phx_dyslipi'],
        "arrest_er_time": input_dict['arrest_er_time'],
        "cpr": input_dict['cpr'],
    },
    print(len(input_data_dict))

    list_proba = []
    # for lower in np.arange(0, 1860, 60):
    #     # print(lower)

    #     filename = "./PCDSS_OHCA/" + "lgb" + str(int(lower/60)) + ".pkl"
    #     # print(filename)

    #     testX = np.reshape(input_dict["input_data"], (1, -1))

    #     # Load model
    #     model = joblib.load(filename)
    #     proba = model.predict_proba(testX)
    #     proba_result = proba[:, 1].mean()
    #     list_proba.append(proba_result)
    #     # print(proba_result)

    # X_plot = list(range(0, 31))
    # Y_plot = np.array(list_proba)*100

    # return {"status": 200, "output_data": {"X_plot": X_plot, "Y_plot": Y_plot, "list_proba": list_proba}}
    return {"status": 200}


app.run(debug=True)
