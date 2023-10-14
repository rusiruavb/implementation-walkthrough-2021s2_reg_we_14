import 'package:mobile_app/constants.dart';
import 'package:provider/provider.dart';
import 'package:flutter/material.dart';

class RechargePoint extends StatefulWidget {
  final String name;
  final String location;
  final String city;
  final String distance;

  RechargePoint({this.name, this.location, this.city, this.distance});

  @override
  _RechargePointState createState() => _RechargePointState(
        name: name,
        location: location,
        city: city,
        distance: distance,
      );
}

class _RechargePointState extends State<RechargePoint> {
  final String name;
  final String location;
  final String city;
  final String distance;

  _RechargePointState({this.name, this.location, this.city, this.distance});
  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;

    return Container(
      decoration: BoxDecoration(
        boxShadow: [
          BoxShadow(
            color: Color(SECONDARY_COLOR_02),
            blurRadius: 10,
            spreadRadius: -22,
            offset: Offset(5.0, 5.0),
          )
        ],
      ),
      padding: EdgeInsets.all(5),
      child: Card(
        shape: RoundedRectangleBorder(
          side: BorderSide(
            color: Color(PRIMARY_COLOR),
            width: 1.0,
          ),
          borderRadius: BorderRadius.circular(5),
        ),
        child: Padding(
          padding: const EdgeInsets.all(8.0),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  Row(
                    children: <Widget>[
                      Text(
                        name,
                        style: TextStyle(
                          fontFamily: INTER_REGULAR,
                          fontSize: 15,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ],
                  ),
                  Row(
                    children: <Widget>[
                      Padding(
                        padding: const EdgeInsets.only(top: 5),
                        child: Text(
                          city,
                          style: TextStyle(
                            fontFamily: INTER_REGULAR,
                            fontSize: 13,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
              Column(
                crossAxisAlignment: CrossAxisAlignment.end,
                children: <Widget>[
                  Row(
                    mainAxisAlignment: MainAxisAlignment.end,
                    children: <Widget>[
                      Icon(
                        Icons.location_on,
                        size: 25,
                        color: Color(PRIMARY_COLOR),
                      ),
                    ],
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.end,
                    children: <Widget>[
                      Text(
                        distance + ' from ' + location,
                        style: TextStyle(
                          fontFamily: INTER_REGULAR,
                          fontSize: 13,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                    ],
                  ),
                ],
              )
            ],
          ),
        ),
      ),
    );
  }
}
