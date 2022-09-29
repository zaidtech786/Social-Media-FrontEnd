import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import Axios from "axios";

const News = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const getData = () => {
    setLoading(true);
    Axios.get(
      "https://newsapi.org/v2/top-headlines?country=in&apiKey=55d7bf49be2b471e823fc66cacc0fb93"
    )
      .then((res) => {
        console.log(res);
        setData(res.data.articles);
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  };

  useEffect(() => {
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Text>
        <ActivityIndicator size="large" color="#000" />
      </Text>
    </View>;
    getData();
  }, []);

  return (
    <>
      <View style={{ backgroundColor: "#f1c40f", paddingVertical: 20 }}>
        <Text
          style={{
            alignSelf: "center",
            marginTop: 40,
            fontSize: 30,
            backgroundColor: "#f1c40f",
          }}
        >
          News
        </Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => {
          console.log(item);
          return (
            <View style={styles.container}>
              <View style={styles.card}>
                <Image source={{ uri: item.urlToImage }} style={styles.image} />
                <Text
                  style={{ marginTop: 5, fontWeight: "600", marginLeft: 10 }}
                >
                  {item.title}
                </Text>
                <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
                  <Text
                    style={{ marginTop: 5, fontWeight: "400", marginLeft: 10 }}
                    numberOfLines={3}
                  >
                    {item.content}
                  </Text>
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 10,
                    marginHorizontal: 10,
                  }}
                >
                  <Text style={{ fontWeight: "400" }}>
                    By :
                    <Text style={{ fontWeight: "600", color: "#00cec9" }}>
                      {item.author}
                    </Text>
                  </Text>
                  <Text style={{ fontWeight: "600", color: "#d63031" }}>
                    {item.publishedAt.slice(0, 10)}
                  </Text>
                </View>
                <Text
                  style={{
                    marginTop: 10,
                    marginLeft: 10,
                    fontWeight: "600",
                    color: "#6c5ce7",
                  }}
                >
                  Source : {item.source.name}
                </Text>
              </View>
            </View>
          );
        }}
      />
    </>
  );
};

export default News;

const styles = StyleSheet.create({
  container: {
    // marginTop: 40,
    alignSelf: "center",
    width: "90%",
  },
  card: {
    marginTop: 40,
    borderWidth: 1,
    borderColor: "#000",
    alignSelf: "center",
    width: 300,
    // borderRadius: 30,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  image: {
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    width: "100%",
    height: 200,
    // aspectRatio: 1,
  },
});
