import { Link, useRouter } from "expo-router";
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Start() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (email.trim() === '' || password.trim() === '') {
      setError('Email and Password cannot be empty');
      return;
    }

    // If valid → clear error and navigate
    setError('');
    router.push('/dash');
  };

  return (
    <View className="flex-1 items-center justify-center bg-gray-100 px-6">

      <Text className="text-4xl text-center font-bold text-black mb-10">
        Welcome
      </Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        className="w-full bg-white p-4 rounded-lg mb-4 border border-gray-300"
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        className="w-full bg-white p-4 rounded-lg mb-4 border border-gray-300"
      />

      {/* ❗ Error Message */}
      {error !== '' && (
        <Text className="text-red-500 mb-4">{error}</Text>
      )}

      {/* 🔘 Login Button */}
      <TouchableOpacity
        onPress={handleLogin}
        className="bg-blue-500 py-4 px-6 rounded-2xl mb-6 items-center justify-center w-60"
      >
        <Text className="text-lg text-white">
          Login
        </Text>
      </TouchableOpacity>

      {/* 🔗 Signup Link */}
      <Link href="/signup" asChild>
        <TouchableOpacity>
          <Text className="text-blue-500 underline">Sign Up</Text>
        </TouchableOpacity>
      </Link>

    </View>
  );
}