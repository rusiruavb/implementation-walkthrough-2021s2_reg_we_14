import 'package:flutter/material.dart';
import 'package:mobile_app/components/buttons/rounded_button.dart';
import 'package:mobile_app/components/input_fields/rounded_input_field.dart';
import 'package:mobile_app/providers/smart_card_provider.dart';
import 'package:provider/provider.dart';
import 'package:syncfusion_flutter_barcodes/barcodes.dart';

import '../../constants.dart';

class CashRecharge extends StatefulWidget {
  @override
  _CashRecharge createState() => _CashRecharge();
}

class _CashRecharge extends State<CashRecharge> {
  String charaterSet =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTUzNzRlYzRkY';

  void validateAndSubmit() {
    print('tes');
  }

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;

    return Container(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: <Widget>[
          SizedBox(
            height: 20,
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.end,
            children: <Widget>[
              Container(
                padding: EdgeInsets.only(left: 20),
                height: 300,
                child: SfBarcodeGenerator(
                  value: charaterSet,
                  symbology: QRCode(),
                  showValue: false,
                ),
              ),
            ],
          ),
          SizedBox(
            height: 20,
          ),
          Row(
            children: <Widget>[
              Padding(
                padding: const EdgeInsets.only(left: 20, right: 20),
                child: Text(
                  '* First enter the amount that you want to reacharge. \n* Then scan this QR code using the scan machine. \n* Finally press "Pay"',
                  style: TextStyle(
                    fontFamily: INTER_REGULAR,
                    color: Colors.red,
                    fontSize: 13,
                  ),
                ),
              ),
            ],
          ),
          SizedBox(
            height: 10,
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              Padding(
                padding: const EdgeInsets.only(left: 20),
                child: RoundedTextFeild(
                  isNumber: true,
                  isRequiredFeild: true,
                  isPassword: false,
                  isPhoneNumber: false,
                  onChange: (value) {
                    print(value);
                  },
                  text: 'Recharge Amount',
                ),
              ),
            ],
          ),
          SizedBox(
            height: 10,
          ),
          Row(
            children: <Widget>[
              Consumer<SmartCardProvider>(builder: (context, value, child) {
                return Container(
                  margin: EdgeInsets.only(left: 20),
                  height: 60,
                  width: size.width * 0.9,
                  child: ClipRRect(
                    borderRadius: BorderRadius.circular(15),
                    child: FlatButton(
                      disabledColor: value.isLoading
                          ? Color(SECONDARY_COLOR_02)
                          : Color(PRIMARY_COLOR),
                      padding:
                          EdgeInsets.symmetric(vertical: 17.5, horizontal: 22),
                      color: Color(PRIMARY_COLOR),
                      onPressed: value.isLoading ? null : validateAndSubmit,
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          value.isLoading
                              ? Row(
                                  // Loading animation
                                  children: <Widget>[
                                    SizedBox(
                                      width: 20,
                                      height: 20,
                                      child: CircularProgressIndicator(
                                        color: Colors.white,
                                        strokeWidth: 2,
                                      ),
                                    ),
                                    Padding(
                                      padding: const EdgeInsets.only(left: 10),
                                      child: Text(
                                        'PROCESSING',
                                        style: TextStyle(
                                          color: Colors.white,
                                          fontFamily: PRIMARY_FONT_REGULAR,
                                          fontSize: 18,
                                          fontWeight: FontWeight.w600,
                                        ),
                                      ),
                                    ),
                                  ],
                                )
                              : Text(
                                  'PAY',
                                  style: TextStyle(
                                    color: Colors.white,
                                    fontFamily: PRIMARY_FONT_REGULAR,
                                    fontSize: 18,
                                    fontWeight: FontWeight.w600,
                                  ),
                                ),
                        ],
                      ),
                    ),
                  ),
                );
              })
            ],
          ),
          SizedBox(
            height: 20,
          ),
        ],
      ),
    );
  }
}
