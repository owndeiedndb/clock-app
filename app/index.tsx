import { useEffect, useState } from 'react';
  import { View, Text, StyleSheet } from 'react-native';
  import { StatusBar } from 'expo-status-bar';

  export default function ClockScreen() {
    const [time, setTime] = useState(new Date());
    const [date, setDate] = useState('');

    useEffect(() => {
      const timer = setInterval(() => setTime(new Date()), 1000);
      return () => clearInterval(timer);
    }, []);

    useEffect(() => {
      const days = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
      const months = ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
      const d = new Date();
      setDate(`${days[d.getDay()]}، ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`);
    }, [time]);

    const hours = String(time.getHours()).padStart(2, '0');
    const minutes = String(time.getMinutes()).padStart(2, '0');
    const seconds = String(time.getSeconds()).padStart(2, '0');

    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        <Text style={styles.date}>{date}</Text>
        <View style={styles.clockBox}>
          <Text style={styles.time}>{hours}:{minutes}</Text>
          <Text style={styles.seconds}>{seconds}</Text>
        </View>
        <View style={styles.dotsRow}>
          {[...Array(3)].map((_, i) => (
            <View key={i} style={[styles.dot, { opacity: 0.3 + i * 0.35 }]} />
          ))}
        </View>
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#0a0a0a',
      alignItems: 'center',
      justifyContent: 'center',
    },
    date: {
      color: '#888',
      fontSize: 16,
      marginBottom: 32,
      letterSpacing: 1,
      fontWeight: '300',
    },
    clockBox: {
      alignItems: 'flex-end',
      flexDirection: 'row',
      gap: 4,
    },
    time: {
      color: '#ffffff',
      fontSize: 80,
      fontWeight: '200',
      letterSpacing: -2,
    },
    seconds: {
      color: '#00ff99',
      fontSize: 32,
      fontWeight: '300',
      marginBottom: 12,
    },
    dotsRow: {
      flexDirection: 'row',
      gap: 8,
      marginTop: 40,
    },
    dot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: '#00ff99',
    },
  });