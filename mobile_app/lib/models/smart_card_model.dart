class SmartCardModel {
  String cardType;
  String packageName;
  String cardNumber;
  String securityNumber;
  String createdAt;
  int initialAmount;
  int availableAmout;
  List<Reload> reloads;
  bool isLoanTaken;

  SmartCardModel({
    this.cardType,
    this.packageName,
    this.cardNumber,
    this.securityNumber,
    this.createdAt,
    this.initialAmount,
    this.availableAmout,
    this.reloads,
    this.isLoanTaken,
  });

  factory SmartCardModel.fromJson(Map<String, dynamic> json) {
    return SmartCardModel(
      cardType: json['cardType'],
      packageName: json['packageName'],
      cardNumber: json['cardNumber'],
      securityNumber: json['securityNumber'],
      createdAt: json['createdAt'],
      initialAmount: json['digitalWalletId']['initialAmount'],
      availableAmout: json['digitalWalletId']['availableAmount'],
      reloads: (json['digitalWalletId']['reload'] as List)
              ?.map((value) => Reload.fromJson(value))
              ?.toList() ??
          [],
      isLoanTaken: json['digitalWalletId']['isLoan'],
    );
  }
}

class Reload {
  String id;
  int amount;
  String createdAt;

  Reload({this.id, this.amount, this.createdAt});

  factory Reload.fromJson(Map<String, dynamic> json) {
    return Reload(
      id: json['_id'],
      amount: json['amount'],
      createdAt: json['createdAt'],
    );
  }
}
