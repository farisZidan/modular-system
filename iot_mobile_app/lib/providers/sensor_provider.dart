// lib/providers/sensor_provider.dart
import 'package:flutter/material.dart';

import '../services/api_service.dart';

class Sensor {
  final String id;
  final String name;
  final double value;
  final String unit;
  final String state; // OK, WARNING, DANGER
  Sensor({
    required this.id,
    required this.name,
    required this.value,
    required this.unit,
    required this.state,
  });
}

class SensorProvider with ChangeNotifier {
  final ApiService _apiService = ApiService();
  List<Sensor> _sensors = [];
  bool _isLoading = false;
  String? _errorMessage;
  List<Sensor> get sensors => _sensors;
  bool get isLoading => _isLoading;
  String? get errorMessage => _errorMessage;
  Future<void> fetchAndSyncData() async {
    _isLoading = true;
    _errorMessage = null;
    notifyListeners();
    try {
      final data = await _apiService.fetchMobileDashboard();
      // Mengubah JSON BFF Mobile ([{ "v": 28.5, "u": "°C", "st": "OK" }]) menjadi objek Dart.
      _sensors = data.map((sensor) {
        return Sensor(
          id: sensor['id'] as String,
          name: sensor['id'] as String,
          value: (sensor['v'] as num).toDouble(),
          unit: sensor['u'] as String,
          state: sensor['st'] == 'WARN' ? 'WARNING' : sensor['st'] as String,
        );
      }).toList();
    } catch (error) {
      _errorMessage = error.toString();
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }
}
