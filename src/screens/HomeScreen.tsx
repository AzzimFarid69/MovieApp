import React, { useEffect, useState, useCallback } from "react";
import { View, Text, FlatList, TextInput, ActivityIndicator, TouchableOpacity, StyleSheet } from "react-native";
import axios from 'axios';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from "../../App";
import MovieItem from '../components/MovieItem';
import MovieService, { Movie } from "../services/MovieService";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
    navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [searching, setSearching] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
      loadMovies();
    }, []);
  
    const loadMovies = async () => {
      try {
        setLoading(true);
        const allMovies = await MovieService.getAllMovies();
        setMovies(allMovies);
        setFilteredMovies(allMovies);
      } catch {
        setError('Failed to load movies.');
      } finally {
        setLoading(false);
      }
    };
  
    const handleSearch = async (text: string) => {
      setSearchQuery(text);
      if (text.trim()) {
        try {
          const results = await MovieService.searchMovies(text);
          setFilteredMovies(results);
        } catch {
          setError('Failed to search movies.');
        }
      } else {
        setFilteredMovies(movies);
      }
    };
  
    if (loading) {
      return <ActivityIndicator size="large" style={{ marginTop: 20 }} />;
    }
  
    if (error) {
      return (
        <View style={styles.centered}>
          <Text style={{ color: 'red' }}>{error}</Text>
        </View>
      );
    }
  
  
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search Movies..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <FlatList
          data={filteredMovies.slice(0, 20)}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('Details', { id: item.id })}>
              <MovieItem movie={item} />
            </TouchableOpacity>
          )}
        />
    </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    searchBar: {
      height: 50,
      borderColor: "#ccc",
      borderWidth: 1,
      margin: 10,
      paddingHorizontal: 15,
      borderRadius: 8,
    },
    searchLoading: {
      marginLeft: 15,
      marginBottom: 10,
    },
    centered: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    errorText: {
      color: "red",
      fontSize: 16,
      marginBottom: 10,
    },
    retryButton: {
      backgroundColor: "#007bff",
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 6,
    },
    retryText: {
      color: "#fff",
      fontWeight: "bold",
    },
    noResults: {
      textAlign: "center",
      marginTop: 20,
      color: "#666",
    },
  });
  
export default HomeScreen;