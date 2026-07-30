import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  

  const handleSignUp = async () => {
    if (name.trim() === "" || email.trim() === "" || password.trim() === "") {
      setError("Name, email and password are all required");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    
  };

  return (
    <View className="flex-1 items-center justify-center bg-gray-100 p-6">
      <Text className="text-3xl font-bold mb-6 text-black-100">Sign Up</Text>

      <TextInput
        placeholder="Name"
        placeholderTextColor="#999"
        value={name}
        onChangeText={setName}
        className="w-full bg-white-100 p-4 rounded-lg mb-4 border border-gray-300"
      />

      <TextInput
        placeholder="Email"
        placeholderTextColor="#999"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        className="w-full bg-white-100 p-4 rounded-lg mb-4 border border-gray-300"
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        className="w-full bg-white-100 p-4 rounded-lg mb-6 border border-gray-300"
      />

      {error !== "" && <Text className="text-red-500 mb-4">{error}</Text>}

      <TouchableOpacity
        className="bg-light-100 py-4 px-6 rounded-2xl mb-6 items-center justify-center w-60"
        onPress={handleSignUp}
        disabled={submitting}
      >
        {submitting ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text className="text-white text-lg">Create Account</Text>
        )}
      </TouchableOpacity>

      <Link href="/start" asChild>
        <TouchableOpacity>
          <Text className="text-blue-500 underline">Login</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
