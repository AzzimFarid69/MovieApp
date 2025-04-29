import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface MovieItemProps {
    movie: {
        id: number;
        title: string;
        year: number;
        director: string;
    };
}

const MovieItem: React.FC<MovieItemProps> = React.memo(({ movie }) => {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.subText}>Year: {movie.year}</Text>
        <Text style={styles.subText}>Director: {movie.director}</Text>
      </View>
    );
});

const styles = StyleSheet.create({
    container: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        backgroundColor: '#fff',
      },
      title: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 4,
        color: '#333',
      },
      subText: {
        fontSize: 14,
        color: '#666',
      },
  });

export default MovieItem;