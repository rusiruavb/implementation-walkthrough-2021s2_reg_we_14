import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:mobile_app/components/buttons/rounded_button.dart';
import 'package:mobile_app/components/input_fields/rounded_input_field.dart';
import 'package:mobile_app/constants.dart';
import 'package:mobile_app/providers/user_provider.dart';
import 'package:provider/provider.dart';

class LoginForm extends StatefulWidget {
  @override
  _LoginFromState createState() => _LoginFromState();
}

class _LoginFromState extends State<LoginForm> {
  String emailAddress;
  String password;
  GlobalKey<FormState> _formKey =
      GlobalKey<FormState>(debugLabel: '_loginFormKey');

  void validateAndSubmit() {
    if (_formKey.currentState.validate()) {
      if (emailAddress != null && password != null) {
        Provider.of<UserActionsProvider>(context, listen: false)
            .setIsLoading(true);
        context
            .read<UserActionsProvider>()
            .login(emailAddress, password, context);
      } else {
        Fluttertoast.showToast(
          msg: 'Pelase fill the email address and password',
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;

    return Container(
      height: size.height,
      child: Padding(
        padding: EdgeInsets.only(top: 120),
        child: Form(
          key: _formKey,
          child: Column(
            children: <Widget>[
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  Align(
                    alignment: Alignment.topCenter,
                    child: Text(
                      'LOGIN HERE',
                      style: TextStyle(
                        fontFamily: INTER_BOLD,
                        fontSize: 26,
                      ),
                    ),
                  )
                ],
              ),
              Padding(
                padding: EdgeInsets.only(top: 120),
                child: Column(
                  children: <Widget>[
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        RoundedTextFeild(
                          isRequiredFeild: true,
                          icon: Icons.email,
                          isNumber: false,
                          isPassword: false,
                          isPhoneNumber: false,
                          text: 'Email',
                          onChange: (value) {
                            emailAddress = value;
                          },
                        ),
                      ],
                    ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        RoundedTextFeild(
                          isRequiredFeild: true,
                          isNumber: false,
                          isPassword: true,
                          isPhoneNumber: false,
                          text: 'Password',
                          onChange: (value) {
                            password = value;
                          },
                        ),
                      ],
                    ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.end,
                      children: [
                        Padding(
                          padding: const EdgeInsets.only(right: 20),
                          child: Text(
                            'Forget Password?',
                            style: TextStyle(
                              fontFamily: INTER_MEDIUM,
                              fontSize: 16,
                              fontWeight: FontWeight.w600,
                              color: Colors.blueAccent,
                            ),
                          ),
                        ),
                      ],
                    ),
                    SizedBox(
                      height: 10,
                    ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.end,
                      children: [
                        Padding(
                          padding: const EdgeInsets.only(right: 20),
                          child: InkWell(
                            child: Text(
                              'Already have an account?',
                              style: TextStyle(
                                fontFamily: INTER_MEDIUM,
                                fontSize: 16,
                                fontWeight: FontWeight.w600,
                                color: Colors.blueAccent,
                              ),
                            ),
                            onTap: () {
                              Navigator.pushNamed(context, '/signup');
                            },
                          ),
                        ),
                      ],
                    ),
                    SizedBox(
                      height: 20,
                    ),
                    Consumer<UserActionsProvider>(
                        builder: (context, value, child) {
                      return Padding(
                        padding: const EdgeInsets.only(left: 20, right: 20),
                        child: Container(
                          margin: EdgeInsets.symmetric(vertical: 0),
                          height: 60,
                          width: size.width,
                          child: ClipRRect(
                            borderRadius: BorderRadius.circular(15),
                            child: FlatButton(
                              disabledColor: value.isLoading
                                  ? Color(SECONDARY_COLOR_02)
                                  : Color(PRIMARY_COLOR),
                              padding: EdgeInsets.symmetric(
                                  vertical: 17.5, horizontal: 22),
                              color: Color(PRIMARY_COLOR),
                              onPressed:
                                  value.isLoading ? null : validateAndSubmit,
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
                                              padding: const EdgeInsets.only(
                                                  left: 10),
                                              child: Text(
                                                'LOGGING',
                                                style: TextStyle(
                                                  color: Colors.white,
                                                  fontFamily:
                                                      PRIMARY_FONT_REGULAR,
                                                  fontSize: 18,
                                                  fontWeight: FontWeight.w600,
                                                ),
                                              ),
                                            ),
                                          ],
                                        )
                                      : Text(
                                          'LOGIN',
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
                        ),
                      );
                    })
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
