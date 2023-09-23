import React, {useEffect, useState} from 'react'
import { SafeAreaView, Text, StyleSheet, View, TouchableOpacity, ImageBackground } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {db} from '../firebase'
import {doc, updateDoc, onSnapshot, increment } from 'firebase/firestore'
import Spinner from 'react-native-loading-spinner-overlay';
import { useNavigation } from '@react-navigation/native';


const TodayPoll = () => {

    const navigation = useNavigation();
    //Determins if the user has clicked or not
    const [hasClicked, setHasClicked] = useState(false);
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


    //This next couple of lines of code gets todays date and 
    //yesterdays date to use as the key for async stoarge
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    String; todayDate = today.toDateString()
    String; yesterdayDate = yesterday.toDateString()

    //The function runs when the app loads, it checks if the user 
    //has voted today and it also deletes the async storage for yesterday.
    useEffect(() => {
        asyncData()
        getQuestionAndAsnwers()
    }, [])

    const asyncData = async ()  => {
        try {
            const todayValue = await AsyncStorage.getItem(todayDate);
            if (todayValue !== null) {
                setHasClicked(true)
            } 
            const yesterdayValue = await AsyncStorage.getItem(yesterdayDate)
            if (yesterdayValue !== null) {
                await AsyncStorage.removeItem(yesterdayDate);
            }
        } catch(error) {
            console.log(error)
        }
    }

    //Gets the question, answer, and answer count from the database.
    const getQuestionAndAsnwers = () => {
        onSnapshot(doc(db, 'TodayPoll', 'Poll'), (doc) => {
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

    //Called when the user clicked
    const click = async (value) => {
        try {
            await AsyncStorage.setItem(todayDate, todayDate);
            setHasClicked(true)
        } catch (e) {
            console.log("cant set item");
        }
        const docRef = doc(db, 'TodayPoll', 'Poll')
        if (value === 1) {
            await updateDoc(docRef, {
                answerOneCount: increment(1)
            })
        } else if (value === 2) {
            await updateDoc(docRef, {
                answerTwoCount: increment(1)
            })
        } else if (value === 3) {
            await updateDoc(docRef, {
                answerThreeCount: increment(1)
            })
        } else if (value == 4) {
            await updateDoc(docRef, {
                answerFourCount: increment(1)
            })
        }
    }

    if (!hasClicked) {
        return (
            <ImageBackground
                source={require('../assets/background.jpeg')}
                style={{flex: 1}}
                resizeMode="cover"
            >
            <SafeAreaView style={styles.container}>
                <View style={styles.tomorrowPollContainer}>
                    <TouchableOpacity>
                        <Text style={styles.buttonText}>Vote for tomorrow's Pollz</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.todayPollContainer}>
                    <View style={styles.pollView}>
                        <View style={styles.questionView}>
                            <Text style={styles.questionText}>
                                {question}
                            </Text>
                        </View>
                        <View style={styles.answerView}>
                            <TouchableOpacity 
                                style={styles.answerButtons}
                                onPress={() => click(1)}
                            >
                                <Text style={styles.answerText}>{answerOne}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={styles.answerButtons}
                                onPress={() => click(2)}
                            >
                                <Text style={styles.answerText}>{answerTwo}</Text>
                            </TouchableOpacity>
                            {(answerThree == 'null') ? null :
                                <TouchableOpacity 
                                    style={styles.answerButtons}
                                    onPress={() => click(3)}
                                >
                                    <Text style={styles.answerText}>{answerThree}</Text>
                                </TouchableOpacity>
                            }
                            {(answerFour == 'null') ? null :
                                <TouchableOpacity 
                                    style={styles.answerButtons}
                                    onPress={() => click(4)}
                                >
                                    <Text style={styles.answerText}>{answerFour}</Text>
                                </TouchableOpacity>
                            }
                        
                        </View>
                    </View>
                </View>
                <View style={styles.tomorrowPollContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate("YesterdayPoll")}>
                        <Text style={styles.buttonText}>Check out yesterday's Pollz</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            </ImageBackground>
        )
    } else {
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
                                backgroundColor: 'black', height: '100%', borderTopLeftRadius: '22', borderBottomLeftRadius: '22', justifyContent: 'center'}}>
                                    <Text style={{color: 'white', marginHorizontal: 20, fontWeight: '500', fontSize: 17, fontFamily: 'ArialMT'}}>{answerTwo}</Text>
                                </View>

                                <View style={{flex: 100 - (Math.round((answerTwoCount / (answerOneCount + answerTwoCount + answerThreeCount + answerFourCount)) * 100)),
                                backgroundColor: '#E5E4E2', height: '100%', borderTopRightRadius: '22', borderBottomRightRadius: '22', justifyContent: 'center', alignItems: 'flex-end'}}>
                                    <Text style={{color: 'black', marginHorizontal: 20, fontWeight: '500', fontSize: 17, fontFamily: 'ArialMT'}}>{
                                        Math.round((answerTwoCount / (answerOneCount + answerTwoCount + answerThreeCount + answerFourCount)) * 100)}%</Text>
                                </View>
                            </View>
                            {(answerThree == 'null') ? null : 
                                <View style={styles.answerOnceClicked}>
                                    <View style={{flex: Math.round((answerThreeCount / (answerOneCount + answerTwoCount + answerThreeCount + answerFourCount)) * 100), 
                                    backgroundColor: 'black', height: '100%', borderTopLeftRadius: '22', borderBottomLeftRadius: '22', justifyContent: 'center'}}>
                                        <Text style={{color: 'white', marginHorizontal: 20, fontWeight: '500', fontSize: 17, fontFamily: 'ArialMT'}}>{answerThree}</Text>
                                    </View>

                                    <View style={{flex: 100 - (Math.round((answerThreeCount / (answerOneCount + answerTwoCount + answerThreeCount + answerFourCount)) * 100)),
                                    backgroundColor: '#E5E4E2', height: '100%', borderTopRightRadius: '22', borderBottomRightRadius: '22', justifyContent: 'center', alignItems: 'flex-end'}}>
                                        <Text style={{color: 'black', marginHorizontal: 20, fontWeight: '500', fontSize: 17, fontFamily: 'ArialMT'}}>{
                                            Math.round((answerThreeCount / (answerOneCount + answerTwoCount + answerThreeCount + answerFourCount)) * 100)}%</Text>
                                    </View>
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
                    <TouchableOpacity onPress={() => navigation.navigate("YesterdayPoll")}>
                        <Text style={styles.buttonText}>Check out yesterday's Pollz</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            </ImageBackground>
        )
    }
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

export default TodayPoll