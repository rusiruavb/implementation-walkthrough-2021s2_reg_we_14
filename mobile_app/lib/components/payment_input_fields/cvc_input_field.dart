import 'package:flutter/material.dart';
import 'package:flutter_multi_formatter/flutter_multi_formatter.dart';
import 'package:mobile_app/constants.dart';

class CVCInputField extends StatefulWidget {
  final ValueChanged<String> onChange;
  final String text;
  final IconData icon;
  final String value;
  final bool isRequiredFeild;
  const CVCInputField({
    Key key,
    this.onChange,
    this.icon,
    this.value,
    this.text,
    this.isRequiredFeild,
  }) : super(key: key);
  @override
  _CVCInputFieldState createState() => _CVCInputFieldState(
        icon: icon,
        onChange: onChange,
        text: text,
        value: value,
        isRequiredFeild: isRequiredFeild,
      );
}

class _CVCInputFieldState extends State<CVCInputField> {
  final ValueChanged<String> onChange;
  final String text;
  final bool isNumber;
  final String value;
  final IconData icon;
  final bool isRequiredFeild;
  bool _isFieldValid;
  bool _isObscure = true;
  _CVCInputFieldState({
    Key key,
    this.onChange,
    this.isNumber,
    this.icon,
    this.value,
    this.text,
    this.isRequiredFeild,
  });
  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;
    return Container(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            text,
            style: TextStyle(
              fontFamily: INTER_REGULAR,
              fontSize: 15,
              fontWeight: FontWeight.w600,
            ),
            textAlign: TextAlign.left,
          ),
          SizedBox(
            height: size.height * 0.005,
          ),
          TextFieldContainer(
            child: TextFormField(
              validator: (value) {
                if (value.isEmpty) {
                  setState(() {
                    _isFieldValid = false;
                  });
                  return null;
                } else {
                  setState(() {
                    _isFieldValid = true;
                  });
                  return null;
                }
              },
              keyboardType: TextInputType.number,
              decoration: InputDecoration(
                border: InputBorder.none,
                hintText: value,
              ),
              onChanged: onChange,
              style: TextStyle(
                fontFamily: INTER_REGULAR,
                fontSize: 18,
                fontWeight: FontWeight.w500,
                color: Colors.grey[800],
              ),
              inputFormatters: [CreditCardCvcInputFormatter()],
            ),
          ),
          isRequiredFeild != null &&
                  isRequiredFeild &&
                  _isFieldValid != null &&
                  !_isFieldValid
              ? Padding(
                  padding: EdgeInsets.only(left: 5),
                  child: Text(
                    text + ' is required.',
                    style: TextStyle(
                      color: Colors.red[800],
                      fontFamily: PRIMARY_FONT_REGULAR,
                      fontSize: 14,
                    ),
                  ),
                )
              : Text(''),
          SizedBox(
            height: size.height * 0.010,
          ),
        ],
      ),
    );
  }
}

class TextFieldContainer extends StatelessWidget {
  final Widget child;
  const TextFieldContainer({Key key, this.child}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 18, vertical: 7),
      width: size.width * 0.9,
      height: 60,
      decoration: BoxDecoration(
          color: Colors.grey[300], borderRadius: BorderRadius.circular(15)),
      child: child,
    );
  }
}
