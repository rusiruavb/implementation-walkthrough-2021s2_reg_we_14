import 'package:fluttertoast/fluttertoast.dart';
import 'package:mobile_app/components/input_fields/rounded_input_field.dart';
import 'package:mobile_app/components/payment_input_fields/card_expire_field.dart';
import 'package:mobile_app/components/payment_input_fields/card_number.dart';
import 'package:mobile_app/components/payment_input_fields/cvc_input_field.dart';
import 'package:mobile_app/constants.dart';
import 'package:mobile_app/providers/smart_card_provider.dart';
import 'package:provider/provider.dart';
import 'package:flutter/material.dart';

class MakePaymentContent extends StatefulWidget {
  @override
  _MakePaymentContentState createState() => _MakePaymentContentState();
}

class _MakePaymentContentState extends State<MakePaymentContent> {
  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;

    return Container(
      child: Column(
        children: <Widget>[
          Consumer<SmartCardProvider>(builder: (context, value, child) {
            return Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                Container(
                  width: size.width * 0.98,
                  height: 250,
                  decoration: BoxDecoration(
                    boxShadow: [
                      BoxShadow(
                        color: Color(SECONDARY_COLOR_02),
                        blurRadius: 20,
                        spreadRadius: -22,
                        offset: Offset(5.0, 5.0),
                      )
                    ],
                  ),
                  padding: EdgeInsets.all(10),
                  child: Card(
                    elevation: 1,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(20),
                    ),
                    child: Container(
                      padding: EdgeInsets.all(15),
                      decoration: BoxDecoration(
                        gradient: LinearGradient(
                          colors: [
                            Color(PRIMARY_COLOR),
                            Color(SECONDARY_COLOR_01),
                          ],
                          begin: Alignment.topLeft,
                          end: Alignment.bottomRight,
                        ),
                        borderRadius: BorderRadius.circular(20),
                      ),
                      child: Stack(
                        children: <Widget>[
                          Positioned(
                            child: Image.asset(
                              'assets/images/card_logo.png',
                              scale: 60,
                            ),
                            top: 0,
                            right: 0,
                          ),
                          Column(
                            children: <Widget>[
                              Column(
                                children: <Widget>[
                                  Row(
                                    children: [
                                      Text(
                                        value.packageName,
                                        style: TextStyle(
                                          fontFamily: INTER_MEDIUM,
                                          fontSize: 20,
                                          color: Colors.white,
                                        ),
                                      ),
                                    ],
                                  ),
                                  Row(
                                    children: [
                                      Text(
                                        'LKR.' +
                                            value.packagePrice
                                                .toStringAsFixed(2),
                                        style: TextStyle(
                                          fontFamily: INTER_MEDIUM,
                                          fontSize: 18,
                                          color: Colors.white,
                                        ),
                                      ),
                                    ],
                                  )
                                ],
                              ),
                              Padding(
                                padding: const EdgeInsets.only(top: 30),
                                child: Row(
                                  // card holder name
                                  children: <Widget>[
                                    Text(
                                      value.cardNumber,
                                      style: TextStyle(
                                        fontFamily: INTER_MEDIUM,
                                        fontSize: 24,
                                        color: Colors.white,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                              Padding(
                                padding: const EdgeInsets.only(top: 10),
                                child: Row(
                                  children: <Widget>[
                                    Column(
                                      children: [
                                        Text(
                                          'Expire DD/YY: ' + value.expireDate,
                                          style: TextStyle(
                                            fontFamily: INTER_MEDIUM,
                                            fontSize: 16,
                                            color: Colors.white,
                                          ),
                                        ),
                                      ],
                                    ),
                                    Column(
                                      children: [
                                        Padding(
                                          padding:
                                              const EdgeInsets.only(left: 50),
                                          child: Text(
                                            'CVC: ' + value.cvc,
                                            style: TextStyle(
                                              fontFamily: INTER_MEDIUM,
                                              fontSize: 16,
                                              color: Colors.white,
                                            ),
                                          ),
                                        ),
                                      ],
                                    ),
                                  ],
                                ),
                              ),
                              Row(
                                children: <Widget>[
                                  Padding(
                                    padding: const EdgeInsets.only(top: 20),
                                    child: Text(
                                      value.cardHolderName,
                                      style: TextStyle(
                                        fontFamily: INTER_MEDIUM,
                                        fontSize: 20,
                                        color: Colors.white,
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              ],
            );
          }),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              _CardDataInputForm(),
            ],
          ),
        ],
      ),
    );
  }
}

class _CardDataInputForm extends StatefulWidget {
  @override
  _CardDataInputFomrState createState() => _CardDataInputFomrState();
}

class _CardDataInputFomrState extends State<_CardDataInputForm> {
  GlobalKey<FormState> _cardInputFormKey =
      GlobalKey<FormState>(debugLabel: '_paymentFormKey');
  final fieldKey = new GlobalKey();

  void initState() {
    super.initState();
    context.read<SmartCardProvider>().resetState();
  }

  void validateAndSubmit() {
    if (_cardInputFormKey.currentState.validate()) {
      double price = context.read<SmartCardProvider>().selectedPackagePrice;
      String cardNumber = context.read<SmartCardProvider>().enteredCardNumber;
      String cvc = context.read<SmartCardProvider>().enteredCVC;
      String expireDate =
          context.read<SmartCardProvider>().enteredExpireDate.split('/')[0];
      String expireYear =
          context.read<SmartCardProvider>().enteredExpireDate.split('/')[1];
      String packageName = context.read<SmartCardProvider>().packageName;

      if (price != null &&
          cardNumber != null &&
          cvc != null &&
          expireDate != null &&
          expireYear != null) {
        context.read<SmartCardProvider>().createStartCard(
              cardNumber,
              cvc,
              expireDate,
              expireYear,
              price,
              packageName,
              context,
            );
        Provider.of<SmartCardProvider>(context, listen: false)
            .setIsLoading(true);
      } else {
        Fluttertoast.showToast(
          msg: 'Pelase input required data',
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;

    return Container(
      child: Padding(
        padding: const EdgeInsets.all(10),
        child: Form(
          key: _cardInputFormKey,
          child: Column(
            children: <Widget>[
              Row(
                children: <Widget>[
                  RoundedTextFeild(
                    isNumber: false,
                    isPassword: false,
                    isPhoneNumber: false,
                    isRequiredFeild: true,
                    onChange: (value) {
                      context
                          .read<SmartCardProvider>()
                          .setCardHolderName(value);
                    },
                    text: 'Card Holder Name',
                  ),
                ],
              ),
              Row(
                children: <Widget>[
                  CardNumberTextField(
                    value: context.read<SmartCardProvider>().cardNumber,
                    isRequiredFeild: true,
                    onChange: (value) {
                      context.read<SmartCardProvider>().setCardNumber(value);
                    },
                    text: 'Card Number',
                  )
                ],
              ),
              Row(
                children: <Widget>[
                  CardExpireDateField(
                    value: context.read<SmartCardProvider>().expireDate,
                    isRequiredFeild: true,
                    onChange: (value) {
                      context.read<SmartCardProvider>().setExpireDate(value);
                    },
                    text: 'Expire Date',
                  )
                ],
              ),
              Row(
                children: <Widget>[
                  CVCInputField(
                    value: context.read<SmartCardProvider>().cvc,
                    onChange: (value) {
                      context.read<SmartCardProvider>().setCVC(value);
                    },
                    text: 'CVC',
                    isRequiredFeild: true,
                  )
                ],
              ),
              SizedBox(
                height: 10,
              ),
              Row(
                children: <Widget>[
                  Consumer<SmartCardProvider>(builder: (context, value, child) {
                    return Container(
                      margin: EdgeInsets.symmetric(vertical: 0),
                      height: 60,
                      width: size.width * 0.9,
                      child: ClipRRect(
                        borderRadius: BorderRadius.circular(15),
                        child: FlatButton(
                          disabledColor: value.isLoading
                              ? Color(SECONDARY_COLOR_02)
                              : Color(PRIMARY_COLOR),
                          padding: EdgeInsets.symmetric(
                              vertical: 17.5, horizontal: 22),
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
                                          padding:
                                              const EdgeInsets.only(left: 10),
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
              )
            ],
          ),
        ),
      ),
    );
  }
}
