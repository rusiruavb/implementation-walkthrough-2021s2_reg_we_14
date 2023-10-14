import 'package:flutter/material.dart';
import 'package:mobile_app/constants.dart';

class GenderDropdown extends StatefulWidget {
  final ValueChanged<String> onChange;
  final String text;
  final bool isRequiredFeild;
  final String value;

  const GenderDropdown({
    Key key,
    this.isRequiredFeild,
    this.onChange,
    this.text,
    this.value,
  }) : super(key: key);

  @override
  _GenderDropdownState createState() => _GenderDropdownState(
        isRequiredFeild: isRequiredFeild,
        onChange: onChange,
        text: text,
        value: value,
      );
}

class _GenderDropdownState extends State<GenderDropdown> {
  final ValueChanged<String> onChange;
  final String text;
  final bool isRequiredFeild;
  final String value;
  bool _isFieldValid;

  _GenderDropdownState({
    Key key,
    this.isRequiredFeild,
    this.onChange,
    this.text,
    this.value,
  });

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;
    return Container(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
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
          DropDownContainer(
              child: DropdownButtonFormField<String>(
            validator: (value) {
              if (value == null) {
                value = '';
              }
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
            items: gender
                .map(
                  (item) => DropdownMenuItem(
                    child: Text(
                      item,
                      style: TextStyle(
                        fontFamily: INTER_REGULAR,
                        fontSize: 18,
                      ),
                    ),
                    value: item,
                  ),
                )
                .toList(),
            hint: Text(
              'Select your gender',
              style: TextStyle(
                fontFamily: INTER_REGULAR,
                fontSize: 18,
                fontWeight: FontWeight.w500,
                color: Colors.grey[600],
              ),
            ),
            decoration: InputDecoration(
              border: InputBorder.none,
            ),
            onChanged: onChange,
          )),
          isRequiredFeild != null &&
                  isRequiredFeild &&
                  _isFieldValid != null &&
                  !_isFieldValid
              ? Padding(
                  padding: EdgeInsets.only(left: 5),
                  child: Text(
                    text + ' is required!',
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

class DropDownContainer extends StatelessWidget {
  final Widget child;

  const DropDownContainer({
    Key key,
    this.child,
  });

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;

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

List<String> gender = [
  '🧔 Male',
  '👩 Female',
];
