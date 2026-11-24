// lib/services/api_service.dart
import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:flutter/foundation.dart'; // Untuk kCheckGui

class ApiService {
  // Penentuan URL secara dinamis agar berjalan di Emulator maupun Web
  String get baseUrl {
    if (kIsWeb) {
      return "http://localhost:3000"; // Host untuk browser web
    } else {
      // 10.0.2.2 adalah jembatan emulator Android ke localhost PC host
      return "http://10.0.2.2:3000";
    }
  }

  Future<List<Map<String, dynamic>>> fetchMobileDashboard() async {
    final response = await http.get(Uri.parse('$baseUrl/mobile/dashboard'));
    if (response.statusCode == 200) {
      final decoded = json.decode(response.body);
      if (decoded is List) {
        return decoded.cast<Map<String, dynamic>>();
      }
      throw Exception('Format data BFF tidak sesuai');
    } else {
      throw Exception('Gagal memuat data dari BFF NestJS');
    }
  }
}
