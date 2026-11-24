import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'providers/sensor_provider.dart';
import 'shared/theme.dart';

import 'widgets/status_card.dart';

void main() {
  runApp(
    ChangeNotifierProvider(
      create: (context) => SensorProvider(),
      child: const MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: AppTheme.lightTheme,
      home: const DashboardScreen(),
    );
  }
}

class DashboardScreen extends StatefulWidget {
  const DashboardScreen({super.key});
  @override
  State<DashboardScreen> createState() => _DashboardScreenState();
}

class _DashboardScreenState extends State<DashboardScreen> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<SensorProvider>().fetchAndSyncData();
    });
  }

  @override
  Widget build(BuildContext context) {
    final sensorProvider = context.watch<SensorProvider>();
    return Scaffold(
      appBar: AppBar(title: const Text("SENSOR MONITORING")),
      body: ListView(
        padding: const EdgeInsets.all(20),
        children: [
          if (sensorProvider.isLoading)
            const Padding(
              padding: EdgeInsets.only(bottom: 16),
              child: LinearProgressIndicator(),
            ),
          if (sensorProvider.errorMessage != null)
            Padding(
              padding: const EdgeInsets.only(bottom: 16),
              child: Text(
                sensorProvider.errorMessage!,
                style: const TextStyle(
                  color: Colors.red,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
          ...sensorProvider.sensors.map(
            (s) => Padding(
              padding: const EdgeInsets.only(bottom: 16),
              child: StatusCard(
                label: s.name,
                value: s.value,
                unit: s.unit,
                status: s.state,
              ),
            ),
          ),
          const SizedBox(height: 20),
          /*
ElevatedButton(
onPressed: () {
context.read<SensorProvider>().updateTemperature('S1', 45.0);
},
child: const Text("SIMULASI OVERHEAT (S1)"),
)
*/
          ElevatedButton.icon(
            onPressed: sensorProvider.isLoading
                ? null
                : () {
                    context.read<SensorProvider>().fetchAndSyncData();
                  },
            icon: const Icon(Icons.refresh),

            label: const Text("REFRESH DARI API"),
          ),
        ],
      ),
    );
  }
}
