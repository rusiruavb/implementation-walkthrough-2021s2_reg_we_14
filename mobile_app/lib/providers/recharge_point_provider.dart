import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:http/http.dart' as http;
import 'package:mobile_app/models/recharge_point_model.dart';
import 'package:mobile_app/providers/api_endpoints.dart';

class RechargePointProvider with ChangeNotifier {
  List<RechargePointModel> rechargePoints = [];

  Future<List<RechargePointModel>> getRechargePoints() async {
    final authToken = await FlutterSecureStorage().read(key: 'token');

    if (authToken != null) {
      final responseData = await http.get(
        Uri.parse(GetRechargePoints),
        headers: {'Authorization': authToken},
      );

      if (responseData.statusCode == 201) {
        final data = jsonDecode(responseData.body) as List;

        if (rechargePoints.length > 0) {
          return rechargePoints;
        } else {
          for (Map<String, dynamic> model in data) {
            rechargePoints.add(RechargePointModel.fromJson(model));
          }
          return rechargePoints;
        }
      } else {
        Fluttertoast.showToast(
          msg: 'Cannot get the recharge points',
        );
        return null;
      }
    } else {
      Fluttertoast.showToast(
        msg: 'Your information not found. Please Login',
      );
      return null;
    }
  }
}
