import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:mobile_app/components/buttons/rounded_button.dart';
import 'package:mobile_app/components/input_fields/rounded_dropdown_feild.dart';
import 'package:mobile_app/components/input_fields/rounded_input_field.dart';
import 'package:mobile_app/providers/user_provider.dart';
import 'package:provider/provider.dart';
import '../../constants.dart';

class SignUpForm extends StatefulWidget {
  @override
  _SignUpFormState createState() => _SignUpFormState();
}

class _SignUpFormState extends State<SignUpForm> {
  GlobalKey<FormState> _formKey =
      GlobalKey<FormState>(debugLabel: '_signUpFormKey');
  String firstName;
  String lastName;
  String email;
  String phoneNumber;
  String password;
  String confirmPassword;
  String nic;
  String role = 'PASSENGER';
  String gender;
  bool isLoading = false;

  void validateAndSubmit() {
    if (_formKey.currentState.validate()) {
      if (firstName != null &&
          lastName != null &&
          email != null &&
          phoneNumber != null &&
          password != null &&
          nic != null &&
          gender != null &&
          confirmPassword != null) {
        if (password == confirmPassword) {
          isLoading = true;
          context.read<UserActionsProvider>().register(
                firstName,
                lastName,
                email,
                password,
                role,
                phoneNumber,
                nic,
                gender,
              );
        } else {
          Fluttertoast.showToast(
            msg: 'Passwords are not matched',
          );
        }
      } else {
        Fluttertoast.showToast(
          msg: 'Pelase provide required information',
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;

    return Container(
      child: Padding(
        padding: EdgeInsets.only(top: 50),
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
                      'Register',
                      style: TextStyle(
                        fontFamily: INTER_BOLD,
                        fontSize: 26,
                      ),
                    ),
                  )
                ],
              ),
              Padding(
                padding: EdgeInsets.only(top: 40),
                child: Column(
                  children: <Widget>[
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: <Widget>[
                        RoundedTextFeild(
                          isRequiredFeild: true,
                          icon: Icons.person,
                          isNumber: false,
                          isPassword: false,
                          isPhoneNumber: false,
                          text: 'First Name',
                          onChange: (value) {
                            firstName = value;
                          },
                        ),
                      ],
                    ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: <Widget>[
                        RoundedTextFeild(
                          isRequiredFeild: true,
                          icon: Icons.person,
                          isNumber: false,
                          isPassword: false,
                          isPhoneNumber: false,
                          text: 'Last Name',
                          onChange: (value) {
                            lastName = value;
                          },
                        ),
                      ],
                    ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: <Widget>[
                        GenderDropdown(
                          isRequiredFeild: true,
                          text: 'Gender',
                          onChange: (value) {
                            gender = value.split(' ')[1];
                          },
                        )
                      ],
                    ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: <Widget>[
                        RoundedTextFeild(
                          isRequiredFeild: true,
                          icon: Icons.email,
                          isNumber: false,
                          isPassword: false,
                          isPhoneNumber: false,
                          text: 'Email',
                          onChange: (value) {
                            email = value;
                          },
                        ),
                      ],
                    ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: <Widget>[
                        RoundedTextFeild(
                          isRequiredFeild: true,
                          icon: Icons.phone,
                          isNumber: true,
                          isPassword: false,
                          isPhoneNumber: true,
                          text: 'Contact No',
                          onChange: (value) {
                            phoneNumber = value;
                          },
                        ),
                      ],
                    ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: <Widget>[
                        RoundedTextFeild(
                          isRequiredFeild: true,
                          icon: Icons.contact_page_rounded,
                          isNumber: false,
                          isPassword: false,
                          isPhoneNumber: false,
                          text: 'NIC',
                          onChange: (value) {
                            nic = value;
                          },
                        ),
                      ],
                    ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: <Widget>[
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
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: <Widget>[
                        RoundedTextFeild(
                          isRequiredFeild: true,
                          isNumber: false,
                          isPassword: true,
                          isPhoneNumber: false,
                          text: 'Confirm Password',
                          onChange: (value) {
                            confirmPassword = value;
                          },
                        ),
                      ],
                    ),
                    SizedBox(
                      height: 20,
                    ),
                    Padding(
                      padding: const EdgeInsets.only(
                        left: 20,
                        right: 20,
                        bottom: 20,
                      ),
                      child: RoundedButton(
                        color: Color(PRIMARY_COLOR),
                        fontSize: 18,
                        height: 60,
                        width: size.width,
                        isLoading: false,
                        text: 'REGISTER',
                        loadingText: 'PROCESSING',
                        textColor: Colors.white,
                        action: validateAndSubmit,
                      ),
                    )
                  ],
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}
