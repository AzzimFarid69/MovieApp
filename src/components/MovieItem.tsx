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

const MovieItem: React.FC<MovieItemProps> = ({ movie }) => {
    return(
        <View>
            <Text>{movie.title}</Text>
            <Text>Year: {movie.year}</Text>
            <Text>Director: {movie.director}</Text>
        </View>
    );
}

export default MovieItem;