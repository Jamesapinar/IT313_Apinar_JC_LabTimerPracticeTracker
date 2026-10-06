import { useEffect, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";

function useStopwatch(isRunning: boolean) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    const interval = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);

  return seconds;
}

type PracticeTrackerProps = {
  solved: number;
  onSolve: () => void;
  onReset: () => void;
};

function PracticeTracker({
  solved,
  onSolve,
  onReset,
}: PracticeTrackerProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Practice Tracker</Text>

      <Text style={styles.counter}>
        Solved: {solved}
      </Text>

      <Button
        title="Solve +1"
        onPress={onSolve}
      />

      <View style={styles.space} />

      <Button
        title="Reset"
        onPress={onReset}
      />

      {solved >= 5 && (
        <Text style={styles.greatJob}>
          Great job!
        </Text>
      )}
    </View>
  );
}

type StopwatchProps = {
  seconds: number;
  isRunning: boolean;
};

function Stopwatch({
  seconds,
  isRunning,
}: StopwatchProps) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const time =
    `${String(minutes).padStart(2, "0")}:` +
    `${String(remainingSeconds).padStart(2, "0")}`;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        Lab Stopwatch
      </Text>

      <Text style={styles.timer}>
        {time}
      </Text>

      <Text style={styles.status}>
        {isRunning ? "Running..." : "Paused"}
      </Text>
    </View>
  );
}

export default function LabScreen() {
  const [solved, setSolved] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const seconds = useStopwatch(isRunning);

  const handleSolve = () => {
    setSolved((s) => s + 1);
  };

  const handleReset = () => {
    setSolved(0);
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Lab Timer & Practice Tracker
      </Text>

      <PracticeTracker
        solved={solved}
        onSolve={handleSolve}
        onReset={handleReset}
      />

      <Stopwatch
        seconds={seconds}
        isRunning={isRunning}
      />

      <View style={styles.buttons}>
        <Button
          title="Start"
          onPress={handleStart}
        />

        <View style={styles.space} />

        <Button
          title="Stop"
          onPress={handleStop}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },

  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "white",
    padding: 20,
    marginBottom: 15,
    borderRadius: 10,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },

  counter: {
    fontSize: 22,
    textAlign: "center",
    marginBottom: 15,
  },

  timer: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
  },

  status: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 10,
  },

  greatJob: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 15,
  },

  buttons: {
    marginTop: 10,
  },

  space: {
    height: 10,
  },
});