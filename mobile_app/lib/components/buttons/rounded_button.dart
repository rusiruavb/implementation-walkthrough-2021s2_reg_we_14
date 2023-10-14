import 'package:flutter/material.dart';
import 'package:mobile_app/constants.dart';
import 'package:mobile_app/providers/smart_card_provider.dart';
import 'package:mobile_app/providers/user_provider.dart';
import 'package:provider/provider.dart';

class RoundedButton extends StatefulWidget {
  final String text;
  final Function action;
  final Color color;
  final double height;
  final double width;
  final IconData icon;
  final double iconSize;
  final Color textColor;
  final double fontSize;
  bool isLoading;
  final String loadingText;

  RoundedButton({
    Key key,
    this.text,
    this.action,
    this.height,
    this.width,
    this.color,
    this.textColor,
    this.icon,
    this.iconSize,
    this.isLoading,
    this.fontSize,
    this.loadingText,
  }) : super(key: key);

  @override
  _RoundedButtonState createState() => _RoundedButtonState(
        action: action,
        height: height,
        icon: icon,
        text: text,
        textColor: textColor,
        width: width,
        color: color,
        isLoading: isLoading,
        fontSize: fontSize,
        iconSize: iconSize,
        loadingText: loadingText,
      );
}

class _RoundedButtonState extends State<RoundedButton> {
  final String text;
  final Function action;
  final Color color;
  final double height;
  final double width;
  final IconData icon;
  final double iconSize;
  final Color textColor;
  final double fontSize;
  bool isLoading;
  final String loadingText;

  _RoundedButtonState({
    this.text,
    this.action,
    this.height,
    this.width,
    this.icon,
    this.textColor,
    this.color,
    this.fontSize,
    this.isLoading,
    this.iconSize,
    this.loadingText,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.symmetric(vertical: 0),
      height: height,
      width: width,
      child: ClipRRect(
        borderRadius: BorderRadius.circular(15),
        child: FlatButton(
          disabledColor: isLoading != null && isLoading
              ? Color(SECONDARY_COLOR_02)
              : color,
          padding: EdgeInsets.symmetric(vertical: 17.5, horizontal: 22),
          color: color,
          onPressed: isLoading != null && isLoading ? null : action,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              isLoading != null && isLoading
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
                            loadingText,
                            style: TextStyle(
                              color: textColor,
                              fontFamily: PRIMARY_FONT_REGULAR,
                              fontSize: fontSize,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                        ),
                      ],
                    )
                  : Text(
                      text,
                      style: TextStyle(
                        color: textColor,
                        fontFamily: PRIMARY_FONT_REGULAR,
                        fontSize: fontSize,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
              Padding(
                padding: const EdgeInsets.only(left: 5),
                child: Icon(
                  icon,
                  color: Colors.white,
                  size: iconSize,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
