import React, {useState, useEffect} from "react";
import { SafeAreaView, TouchableOpacity, Text, ImageBackground, StyleSheet, View } from "react-native";
import {db} from '../firebase'
import {doc, updateDoc, onSnapshot, increment } from 'firebase/firestore'
import Spinner from 'react-native-loading-spinner-overlay';
import { useNavigation } from "@react-navigation/native";

const YesterdayPoll = () => {

    const navigation = useNavigation()
    //The question for the poll
    const [question, setQuestion] = useState();
    //The first answer for the poll
    const [answerOne, setAnswerOne] = useState();
    //The second answer for the poll
    const [answerTwo, setAnswerTwo] = useState();
    //The third answer for the poll
    const [answerThree, setAnswerThree] = useState();
    //The forth answer for the poll
    const [answerFour, setAnswerFour] = useState();
    //The first answer count for the poll
    const [answerOneCount, setAnswerOneCount] = useState();
    //The second answer count for the poll
    const [answerTwoCount, setAnswerTwoCount] = useState();
    //The third answer count for the poll
    const [answerThreeCount, setAnswerThreeCount] = useState();
    //The forth answer count for the poll
    const [answerFourCount, setAnswerFourCount] = useState();
    //Loads so I don't get an error
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getQuestionAndAsnwers()
    }, [])

    //Gets the question, answer, and answer count from the database.
    const getQuestionAndAsnwers = () => {
        onSnapshot(doc(db, 'YesterdayPollz', 'Poll'), (doc) => {
                setQuestion(doc.data().Question);
                setAnswerOne(doc.data().answerOne);
                setAnswerTwo(doc.data().answerTwo);
                setAnswerThree(doc.data().answerThree);
                setAnswerFour(doc.data().answerFour);
                setAnswerOneCount(doc.data().answerOneCount);
                setAnswerTwoCount(doc.data().answerTwoCount);
                setAnswerThreeCount(doc.data().answerThreeCount);
                setAnswerFourCount(doc.data().answerFourCount);
                setIsLoading(false);
        })
    }

    return (
        <ImageBackground
            source={require('../assets/background.jpeg')}
            style={{flex: 1}}
            resizeMode="cover"
        >
        <SafeAreaView style={styles.todayPollContainer}>
            <View style={styles.tomorrowPollContainer}>
                <TouchableOpacity>
                    <Text style={styles.buttonText}>Vote for tomorrow's Pollz</Text>
                </TouchableOpacity>
                
            </View>
            {isLoading ?  <Spinner
                    visible={isLoading}
                    textContent={'Loading...'}
                    textStyle={{ color: '#FFF' }}
                /> : 
            <View style={styles.todayPollContainer}>
                <View style={styles.pollView}>
                    <View style={styles.questionView}>
                        <Text style={styles.questionText}>
                            {question}
                        </Text>
                    </View>
                    <View style={styles.answerView}>
                        <View style={styles.answerOnceClicked}>
                            <View style={{flex: Math.round((answerOneCount / (answerOneCount + answerTwoCount + answerThreeCount + answerFourCount)) * 100), 
                            backgroundColor: 'black', height: '100%', borderTopLeftRadius: '22', borderBottomLeftRadius: '22', justifyContent: 'center'}}>
                                <Text style={{color: 'white', marginHorizontal: 20, fontWeight: '500', fontSize: 17, fontFamily: 'ArialMT'}}>{answerOne}</Text>
                            </View>

                            <View style={{flex: 100 - (Math.round((answerOneCount / (answerOneCount + answerTwoCount + answerThreeCount + answerFourCount)) * 100)),
                            backgroundColor: '#E5E4E2', height: '100%', borderTopRightRadius: '22', borderBottomRightRadius: '22', justifyContent: 'center', alignItems: 'flex-end'}}>
                                <Text style={{color: 'black', marginHorizontal: 20, fontWeight: 'bold', fontSize: 17, fontFamily: 'ArialMT'}}>
                                    {Math.round((answerOneCount / (answerOneCount + answerTwoCount + answerThreeCount + answerFourCount)) * 100)}%</Text>
                            </View>
                        </View>
                        <View style={styles.answerOnceClicked}>
                            <View style={{flex: Math.round((answerTwoCount / (answerOneCount + answerTwoCount + answerThreeCount + answerFourCount)) * 100), 
                            backgroundColor: 'black', height: '100%', borderTopLeftRadius: '22', borderBottomLeftRadius: '22', justifyContent: 'center'}}/>
                            <View style={{flex: 100 - (Math.round((answerTwoCount / (answerOneCount + answerTwoCount + answerThreeCount + answerFourCount)) * 100)),
                            backgroundColor: '#E5E4E2', height: '100%', borderTopRightRadius: '22', borderBottomRightRadius: '22', justifyContent: 'center', alignItems: 'flex-end'}}>
                                
                            </View>
                            <Text style={{color: 'white', marginHorizontal: 20, fontWeight: '500', fontSize: 17, fontFamily: 'ArialMT', position: 'absolute'}}>{answerTwo}</Text>
                            <Text style={{color: 'white', marginHorizontal: '45%', fontWeight: '500', fontSize: 17, fontFamily: 'ArialMT', position: 'absolute'}}>{
                                    Math.round((answerTwoCount / (answerOneCount + answerTwoCount + answerThreeCount + answerFourCount)) * 100)}%</Text>
                            
                        </View>
                        {(answerThree == 'null') ? null : 
                            <View style={styles.answerOnceClicked}>
                                <View style={{flex: Math.round((answerThreeCount / (answerOneCount + answerTwoCount + answerThreeCount + answerFourCount)) * 100), 
                                backgroundColor: 'black', height: '100%', borderTopLeftRadius: '22', borderBottomLeftRadius: '22', justifyContent: 'center'}}>
                                    
                                </View>

                                <View style={{flex: 100 - (Math.round((answerThreeCount / (answerOneCount + answerTwoCount + answerThreeCount + answerFourCount)) * 100)),
                                backgroundColor: '#E5E4E2', height: '100%', borderTopRightRadius: '22', borderBottomRightRadius: '22', justifyContent: 'center', alignItems: 'flex-end'}}>
                                    <Text style={{color: 'black', marginHorizontal: 20, fontWeight: '500', fontSize: 17, fontFamily: 'ArialMT'}}>{
                                        Math.round((answerThreeCount / (answerOneCount + answerTwoCount + answerThreeCount + answerFourCount)) * 100)}%</Text>
                                </View>
                                <Text style={{color: 'white', marginHorizontal: 20, fontWeight: '500', fontSize: 17, fontFamily: 'ArialMT', position: 'absolute',}}>{answerThree}</Text>
                            </View>
                        }
                        {(answerFour == 'null') ? null : 
                            <View style={styles.answerOnceClicked}>
                                <View style={{flex: Math.round((answerFourCount / (answerOneCount + answerTwoCount + answerThreeCount + answerFourCount)) * 100), 
                                backgroundColor: 'black', height: '100%', borderTopLeftRadius: '22', borderBottomLeftRadius: '22', justifyContent: 'center'}}>
                                    <Text style={{color: 'white', marginHorizontal: 20, fontWeight: '500', fontSize: 17, fontFamily: 'ArialMT'}}>{answerFour}</Text>
                                </View>

                                <View style={{flex: 100 - (Math.round((answerFourCount / (answerOneCount + answerTwoCount + answerThreeCount + answerFourCount)) * 100)),
                                backgroundColor: '#E5E4E2', height: '100%', borderTopRightRadius: '22', borderBottomRightRadius: '22', justifyContent: 'center', alignItems: 'flex-end'}}>
                                    <Text style={{color: 'black', marginHorizontal: 20, fontWeight: '500', fontSize: 17, fontFamily: 'ArialMT'}}>{
                                        Math.round((answerFourCount / (answerOneCount + answerTwoCount + answerThreeCount + answerFourCount)) * 100)}%</Text>
                                </View>
                            </View>
                        }
                    </View>
                </View>
            </View> }
            <View style={styles.tomorrowPollContainer}>
                <TouchableOpacity onPress={() => navigation.navigate("TodayPoll")}>
                    <Text style={styles.buttonText}>Go back to today's Pollz</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tomorrowPollContainer: {
        backgroundColor: '#E5E4E2',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    todayPollContainer: {
        flex: 6,
    },
    pollView: {
        marginHorizontal: '10%',
        marginVertical: '20%',
        borderWidth: '2',
        borderColor: '#333333',
        flex: 1,
        borderRadius: 35,
        backgroundColor: 'white'
    },
    questionView: {
        flex: 2,
        backgroundColor: '#333333',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    answerView: {
        flex: 5,
        justifyContent: 'space-evenly'
    },
    questionText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginHorizontal: '5%',
        fontFamily: 'ArialMT',
    },
    answerButtons: {
        backgroundColor: '#E5E4E2',
        height: '20%',
        marginHorizontal: '5%',
        borderRadius: '20',
        justifyContent: 'center',
    },
    answerText: {
        fontFamily: 'ArialMT',
        marginHorizontal: 20, 
        fontWeight: 'bold', 
        fontSize: 17

    },
    answerOnceClicked: {
        flexDirection: 'row',
        height: '20%',
        marginHorizontal: '5%',
        borderRadius: '20',
        justifyContent: 'space-between',
        alignItems: 'center'
    }, 
    buttonText: {
        fontFamily: 'ArialMT',
        fontWeight: 'bold', 
        fontSize: 22
    }
})


export default YesterdayPoll