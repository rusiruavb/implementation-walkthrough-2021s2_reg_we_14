class RechargePointModel {
  String name;
  String loacation;
  String distance;
  String city;

  RechargePointModel({this.name, this.loacation, this.distance, this.city});

  factory RechargePointModel.fromJson(Map<String, dynamic> json) {
    return RechargePointModel(
      name: json['name'],
      loacation: json['location'],
      distance: json['distance'],
      city: json['city'],
    );
  }
}
