import 'package:flutter/material.dart';
import 'package:mobile_app/constants.dart';
import 'package:mobile_app/screens/recharge_smart_card/cash_recharge.dart';
import 'package:mobile_app/screens/recharge_smart_card/online_recharge.dart';

class RechargeContent extends StatefulWidget {
  @override
  _RechargeContentState createState() => _RechargeContentState();
}

class _RechargeContentState extends State<RechargeContent> {
  bool _isCashSelect = true;
  bool _isOnlineSelect = false;

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;

    return Container(
      child: Column(
        children: <Widget>[
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              Padding(
                padding: EdgeInsets.only(right: 0),
                child: ClipRRect(
                  borderRadius: BorderRadius.only(
                    topLeft: Radius.circular(10),
                    bottomLeft: Radius.circular(10),
                  ),
                  child: FlatButton(
                    padding:
                        EdgeInsets.symmetric(vertical: 17.5, horizontal: 33),
                    color: _isCashSelect
                        ? Color(PRIMARY_COLOR)
                        : Color(SECONDARY_COLOR_02),
                    onPressed: () {
                      setState(() {
                        _isCashSelect = true;
                        _isOnlineSelect = false;
                      });
                    },
                    child: Text(
                      'CASH RELOAD',
                      style: TextStyle(
                        color: _isCashSelect ? Colors.white : Colors.black,
                        fontFamily: INTER_REGULAR,
                        fontSize: 16,
                        fontWeight: FontWeight.w100,
                      ),
                    ),
                  ),
                ),
              ),
              Padding(
                padding: EdgeInsets.only(left: 0),
                child: ClipRRect(
                  borderRadius: BorderRadius.only(
                    topRight: Radius.circular(10),
                    bottomRight: Radius.circular(10),
                  ),
                  child: FlatButton(
                    padding:
                        EdgeInsets.symmetric(vertical: 17.5, horizontal: 33),
                    color: _isOnlineSelect
                        ? Color(PRIMARY_COLOR)
                        : Color(SECONDARY_COLOR_02),
                    onPressed: () {
                      setState(() {
                        _isOnlineSelect = true;
                        _isCashSelect = false;
                      });
                    },
                    child: Text(
                      'ONELINE RELOAD',
                      style: TextStyle(
                        color: _isOnlineSelect ? Colors.white : Colors.black,
                        fontFamily: INTER_REGULAR,
                        fontSize: 16,
                        fontWeight: FontWeight.w100,
                      ),
                    ),
                  ),
                ),
              )
            ],
          ),
          Row(
            children: <Widget>[
              Padding(
                padding: EdgeInsets.only(
                  left: 20,
                  top: 10,
                ),
                child: Column(
                  children: <Widget>[
                    Row(
                      children: <Widget>[
                        SizedBox(
                          width: size.width * 0.9,
                          child: Text(
                            'To recharge your smart card, you can use either Cash reload or Online reload.',
                            style: TextStyle(
                              fontFamily: INTER_REGULAR,
                              color: Color(PRIMARY_COLOR),
                              fontSize: 13,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ],
          ),
          Row(
            children: <Widget>[
              _isCashSelect ? CashRecharge() : Text(''),
              _isOnlineSelect ? OnlineRecharge() : Text(''),
            ],
          )
        ],
      ),
    );
  }
}
