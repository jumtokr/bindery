import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}


class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: const Text('Jumto')),
        body: const Center(child: DrawingBoard()), // 캔버스를 중앙에 배치
      ),
    );
  }
}

class DrawingBoard extends StatefulWidget {
  const DrawingBoard({super.key});

  @override
  _DrawingBoardState createState() => _DrawingBoardState();
}

class _DrawingBoardState extends State<DrawingBoard> {
  List<Offset> points = [];

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 300, // 캔버스 크기 설정
      height: 300, // 캔버스 크기 설정
      decoration: BoxDecoration(
        border: Border.all(color: Colors.black), // 캔버스 테두리 추가
      ),
      child: GestureDetector(
        onPanUpdate: (details) {
          setState(() {
            final RenderBox renderBox = context.findRenderObject() as RenderBox;
            Offset localPosition = renderBox.globalToLocal(details.globalPosition);

            // 캔버스 범위 내에서만 그림을 그림
            if (localPosition.dx >= 0 &&
                localPosition.dx <= 300 &&
                localPosition.dy >= 0 &&
                localPosition.dy <= 300) {
              points.add(localPosition);
            }
          });
        },
        onPanEnd: (details) {
          points.add(Offset.infinite); // 손을 떼면 새로운 경로 시작
        },
        child: CustomPaint(
          size: const Size(300, 300), // 캔버스 크기 고정
          painter: BrushPainter(points),
        ),
      ),
    );
  }
}

class BrushPainter extends CustomPainter {
  final List<Offset> points;
  BrushPainter(this.points);

  @override
  void paint(Canvas canvas, Size size) {
    Paint paint = Paint()
      ..color = Colors.black
      ..strokeCap = StrokeCap.round
      ..strokeWidth = 5.0;

    for (int i = 0; i < points.length - 1; i++) {
      if (points[i] != Offset.infinite && points[i + 1] != Offset.infinite) {
        canvas.drawLine(points[i], points[i + 1], paint);
      }
    }
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) {
    return true;
  }
}