import 'package:flutter/material.dart';

import '../shared/theme.dart';

class StatusCard extends StatelessWidget {
  final String label;
  final double value;
  final String unit;
  final String status;
  const StatusCard({
    super.key,
    required this.label,
    required this.value,
    required this.unit,
    required this.status,
  });
  @override
  Widget build(BuildContext context) {
    Color statusColor;
    Color bgColor;
    switch (status) {
      case 'WARNING':
        statusColor = AppColors.warning;
        bgColor = const Color(0xFFFFFBEB);
        break;
      case 'DANGER':
        statusColor = AppColors.danger;
        bgColor = const Color(0xFFFEF2F2);
        break;
      default:
        statusColor = AppColors.primary;
        bgColor = const Color(0xFFEFF6FF);
    }
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: bgColor,
        borderRadius: BorderRadius.circular(16),
        border: Border(left: BorderSide(color: statusColor, width: 8)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            label.toUpperCase(),
            style: TextStyle(
              fontSize: 10,
              fontWeight: FontWeight.bold,
              letterSpacing: 1.2,
              color: statusColor.withOpacity(0.8),
            ),
          ),
          const SizedBox(height: 8),
          Row(
            crossAxisAlignment: CrossAxisAlignment.baseline,
            textBaseline: TextBaseline.alphabetic,
            children: [
              Text(
                value.toString(),
                style: const TextStyle(
                  fontSize: 32,
                  fontWeight: FontWeight.w900,
                ),
              ),
              const SizedBox(width: 4),
              Text(
                unit,
                style: const TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.w500,
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          const Divider(color: Colors.black12),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text(
                "INTEGRITY STATUS:",
                style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold),
              ),
              Text(
                status == 'OK' ? 'SYSTEM SECURE' : 'ACTION REQUIRED',
                style: const TextStyle(
                  fontSize: 9,
                  fontWeight: FontWeight.w900,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
