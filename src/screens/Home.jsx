import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { tamaño_texto } from "../utils/material";
import socialApp from "../api/socialApp";
import { useSelector } from "react-redux";
import CardPostFeed from "../components/CardPostFeed";
import Header from "../components/Header";

export default function Home() {
  const limit = useRef(3);
  const { jwt } = useSelector((state) => state);

  const [focusedIndex, setFocusedIndex] = useState(0);

  const [posts, setPosts] = useState([]);
  const getPosts = async () => {
    try {
      let response = await socialApp.get(
        `/posts?pagination[start]=0&pagination[limit]=${limit.current}&populate[reacciones][populate]=*&populate[media]=*&populate[autor][populate]=avatar&populate[comunidad]=*`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      setPosts(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleScroll = useCallback(
    ({
      nativeEvent: {
        contentOffset: { y },
      },
    }) => {
      const offset = Math.round(y / heightPercentageToDP(90));

      setFocusedIndex(offset);
    },
    [setFocusedIndex]
  );

  useEffect(() => {
    getPosts();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.home}>
        <Header />

        <FlatList
          onScroll={handleScroll}
          showsVerticalScrollIndicator={false}
          style={{
            maxHeight: heightPercentageToDP(85),

            height: heightPercentageToDP(85),
            width: widthPercentageToDP(90),
          }}
        
          onEndReachedThreshold={0.9}
          onEndReached={() => {
            limit.current = limit.current + 3;
            getPosts();
          }}
          data={posts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={(post) => {
            return (
              <CardPostFeed
                post={post.item}
                indexPost={focusedIndex}
                index={post.index}
                callback={getPosts}
              />
            );
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F2F2F2",
  },
  home: {
    marginTop: heightPercentageToDP(5),
    width: widthPercentageToDP(90),
    /*    alignItems: "center", */
  },
  title: {
    fontFamily: "Poppins_700Bold",
    fontSize: tamaño_texto.medium,
    color: "#3A3D3F",
  },
});
