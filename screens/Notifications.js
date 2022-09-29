import { StyleSheet, Text, View,TouchableOpacity,Image } from 'react-native'
import React from 'react'

export default function Notifications() {
  return (
    <View>
        <View style={{marginTop:45,marginLeft:20}}>
      <Text style={{fontSize:23,fontWeight:"500"}}>Notifications</Text>

      <TouchableOpacity>
          <View style={styles.chatSection}>
          <TouchableOpacity>
                <Image
                  source={require("../assets/img2.jpeg")}
                  style={styles.img}
                />
              </TouchableOpacity>
            <View style={{marginLeft:10}}>
             
              <Text style={{ marginLeft: 10, fontWeight: "500", fontSize: 15}}>
                Zaid Siddiqui 
              </Text>
              <Text>Whom you might know is on instagram.  1d</Text>
             
            </View>           
          </View>
        </TouchableOpacity  >

        <TouchableOpacity>
          <View style={styles.chatSection}>
          <TouchableOpacity>
                <Image
                  source={require("../assets/img1.jpeg")}
                  style={styles.img}
                />
              </TouchableOpacity>
            <View style={{marginLeft:10}}>
             
              <Text style={{ marginLeft: 10, fontWeight: "500", fontSize: 15}}>
                Saif Siddiqui 
              </Text>
              <Text>Started Following You.  1d</Text>
             
            </View>           
          </View>
        </TouchableOpacity  >

        <TouchableOpacity>
          <View style={styles.chatSection}>
          <TouchableOpacity>
                <Image
                  source={require("../assets/img1.jpeg")}
                  style={styles.img}
                />
              </TouchableOpacity>
            <View style={{marginLeft:10}}>
             
              <Text style={{ marginLeft: 10, fontWeight: "500", fontSize: 15}}>
                Fazil Khan
              </Text>
              <Text>Liked your post  1d</Text>
             
            </View>           
          </View>
        </TouchableOpacity  >
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    chatSection: {
        marginTop: 20,
        flexDirection:'row',
      },
      img: {
        width: 50,
        height: 50,
        borderRadius: 50,
      },
})