import 'package:mobile_app/models/recharge_point_model.dart';
import 'package:mobile_app/providers/recharge_point_provider.dart';
import 'package:mobile_app/screens/recharge_points/recharge_point.dart';
import 'package:provider/provider.dart';
import 'package:flutter/material.dart';

import '../../constants.dart';

class RechargePoints extends StatefulWidget {
  @override
  _RechargePointsState createState() => _RechargePointsState();
}

class _RechargePointsState extends State<RechargePoints> {
  Future<List<RechargePointModel>> rechargePoints;

  @override
  void initState() {
    super.initState();
    rechargePoints = context.read<RechargePointProvider>().getRechargePoints();
  }

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;

    return FutureBuilder<List<RechargePointModel>>(
      future: rechargePoints,
      builder: (context, snapshot) {
        if (snapshot.hasData) {
          return Container(
            height: size.height * 0.9,
            child: Column(
              children: [
                Align(
                  alignment: Alignment.topLeft,
                  child: Padding(
                    padding: const EdgeInsets.only(left: 8),
                    child: Text(
                      'Recharge Points',
                      style: TextStyle(
                        fontFamily: INTER_BOLD,
                        fontSize: 24,
                      ),
                    ),
                  ),
                ),
                Align(
                  alignment: Alignment.topLeft,
                  child: Padding(
                    padding: const EdgeInsets.only(left: 8, right: 8),
                    child: Text(
                      'This page will include both Day Pass and Smart Card recharge locations.',
                      style: TextStyle(
                        fontFamily: INTER_REGULAR,
                        fontSize: 13,
                        color: Colors.grey,
                      ),
                    ),
                  ),
                ),
                Expanded(
                  child: ListView.builder(
                    itemCount: snapshot.data.length,
                    itemBuilder: (BuildContext context, int index) {
                      return RechargePoint(
                        name: snapshot.data[index].name,
                        location: snapshot.data[index].loacation,
                        city: snapshot.data[index].city,
                        distance: snapshot.data[index].distance,
                      );
                    },
                  ),
                ),
              ],
            ),
          );
        } else if (snapshot.hasError) {}
        return Container(
          width: 25,
          height: 25,
          child: CircularProgressIndicator(
            color: Color(PRIMARY_COLOR),
            strokeWidth: 3,
          ),
        );
      },
    );
  }
}
