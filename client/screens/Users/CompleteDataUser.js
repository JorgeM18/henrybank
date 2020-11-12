import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    View,
    TextInput,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    Platform,
    Image,
    Alert
} from 'react-native'

import DateTimePickerModal from "react-native-modal-datetime-picker";
import RNPickerSelect from 'react-native-picker-select';
import moment from "moment";
import * as Animatable from 'react-native-animatable';
import {updateUser} from '../../Store/actions/user'
import AsyncStorage from '@react-native-async-storage/async-storage'



const typeDocs = [

    { label: 'DNI', value: 'dni' },
    { label: 'Passport', value: 'passport' },
    { label: 'name', value: 'name' },

]
const CompleteDataUser = (props) => {


    const dispatch = useDispatch()
    const emailUser=AsyncStorage.getItem('email')
    console.log('email:',emailUser)
  
    const [lastname, setLastname] = useState('')
    const [typeDoc, setTypeDoc] = useState('')
    const [numberDoc, setNumberDoc] = useState('')
    const [birthday, setBirthday] = useState('')
    const [numberPhone, setNumberPhone] = useState('')

    //    CONFIGURACION DE DATA-PICKER
    const [fecha, setFecha] = useState('')
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isMayor, setIsmayor] = useState(true)

    const showDatePicker = () => {
       
        setDatePickerVisibility(true)


    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        // console.warn("A date has been picked: ", date);
        const opciones = { year: 'numeric', month: 'long', day: "2-digit" }
        //Formatear la fecha a ingresar
        var fechaNac = moment(date, 'DD-MM-YYYY');

        var years = moment().diff(fechaNac, 'years');
        console.log(years)
        if (years > 16) {
            setFecha(date.toLocaleDateString('es-ES', opciones))
            setBirthday(fecha)
            setIsmayor(true)
            // hideDatePicker();
          

        } else {
            setIsmayor(false)
            setFecha(date.toLocaleDateString('es-ES', opciones))
           
        }
        hideDatePicker();


    };
    const update=()=>{
        dispatch(updateUser(lastname,typeDoc,numberDoc,birthday, numberPhone))
        props.navigation.navigate("RegistreAdress")

    }

    const placeholderTypeDoc = {
        label: 'Select a Type Document',
        value: null,
        color: '#1e1e1e',

    }

    return (
        <ScrollView style={style.container} >


            <View style={style.header}>
                <Image style={{ width: 70, height: 70 }}
                    source={require('../images/Logo-05.png')} />

            </View>



            <View >
                <TextInput style={style.inputGroup} placeholder=" Lastname User"

                    onChangeText={value => setLastname(value)} />
            </View>
            <View >
                <TextInput style={style.inputGroup} placeholder=" Phone User"
                    keyboardType='numeric'
                    onChangeText={value => setNumberPhone(value)} />
            </View>
            <View style={style.picker}>
                <RNPickerSelect
                    style={pickerSelectStyles}
                    placeholder={placeholderTypeDoc}
                    onValueChange={value => setTypeDoc(value)}
                    items={typeDocs}
                />
            </View>


            <View >
                <TextInput style={style.inputGroup} placeholder=" Number Document"
                    onChangeText={value => setNumberDoc(value)} />
            </View>
            <View>

                <TouchableOpacity style={style.inputGroup} onPress={showDatePicker}>
                    <Text style={{ fontSize: 18, justifyContent: 'center', color: 'gray' }}>Select Brithday</Text>
                </TouchableOpacity>
                {/* <Button title="Show Date Picker" onPress={showDatePicker} color='white' />  */}
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
                {
                    fecha !== '' ? <Text style={{ fontSize: 18, marginTop: 15, alignItems: 'center' }}> Date Selected: {fecha}</Text>
                        : null
                }
                {
                    isMayor ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={style.errorMsg}>You must be of legas age</Text>
                        </Animatable.View>
                }

            </View>
            <View >

                <TouchableOpacity style={style.btn} onPress={update}>
                    <Text style={{ fontSize: 16, color: '#FFF', marginHorizontal: '30%', textAlign: 'center' }}>
                        Save User
                        </Text>
                </TouchableOpacity>
            </View>


        </ScrollView>

    )

}
export default CompleteDataUser;
//CREAR LOS ESTILOS
const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    header: {
        // padding: 20,
        flex: 1,
        flexDirection: 'column',
        height: 90,
        alignItems: 'center',
        justifyContent: 'center'
    },
    box2: {

    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    inputGroup: {
        marginVertical: 10,
        height: 40,
        borderColor: '#e1e1e1',
        borderWidth: 1,
        fontSize: 18,
        width: '90%',
        padding: 10,
        color: 'gray'

    },
    input: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5

    },
    picker: {
        borderColor: '#e1e1e1',
        borderWidth: 1,
        width: 330,
        height: 45,
        marginVertical: 10

    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 7,
        // color: '#05375a',
        marginTop: 10
    },
    dataPicker: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: '#F5FCFF'

    },
    bot: {
        backgroundColor: '#FFF'
    },
    button: {
        width: 280,
        height: 70,
        backgroundColor: '#330066',
        borderRadius: 30,
        justifyContent: 'center',
        marginTop: 15
    },
    text: {
        fontSize: 18,
        color: 'white',
        textAlign: 'center'
    },
    btn: {
        width: 250,
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        backgroundColor: '#1e1e1e',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#FFF',
        marginVertical: 20,
        marginHorizontal: 40

    },
});

const pickerSelectStyles = StyleSheet.create({

    inputAndroid: {
        fontSize: 17,
        borderColor: 'black',
        borderWidth: 1,
        color: 'black',

    },
});