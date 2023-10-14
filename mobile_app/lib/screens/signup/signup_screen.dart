import 'package:flutter/material.dart';
import 'package:mobile_app/components/navigation_menu/side_navigation.dart';
import 'package:mobile_app/screens/signup/signup_form.dart';

import '../../constants.dart';

class SignUpScreen extends StatelessWidget {
  final _scaffoldKey = GlobalKey<ScaffoldState>(debugLabel: 'signUpScreenKey');

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;

    return Scaffold(
      key: _scaffoldKey,
      drawer: Container(
        width: size.width * 0.8,
        child: Drawer(
          elevation: 0.0,
          child: SideNavBar(),
        ),
      ),
      body: Stack(
        children: <Widget>[
          SingleChildScrollView(
            child: SignUpForm(),
          ),
          Padding(
            padding: EdgeInsets.only(top: 30, left: 0),
            child: IconButton(
              onPressed: () => _scaffoldKey.currentState.openDrawer(),
              icon: Icon(
                Icons.notes,
                color: Color(PRIMARY_COLOR),
              ),
            ),
          )
        ],
      ),
    );
  }
}
