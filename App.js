import React, {useState, useEffect} from 'react';
import { Keyboard } from 'react-native';
import {ScrollView, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, Modal} from 'react-native';
import Task from './components/Task';

export default function App() {

  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  const [donePage, setDonePage] = useState(false);
  const [doneItems, setDoneItems] = useState([]);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const handleAddTask= () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems,task]);
    setTask(null);
  }

  const completeTask = (index) =>{
    doneItems.push(taskItems[index]);
    let itemCopy = [...taskItems];
    itemCopy.splice(index, 1);
    setTaskItems(itemCopy);
  }

  const deleteD = (index) =>{
    let itemCopy = [...doneItems];
    itemCopy.splice(index, 1);
    setDoneItems(itemCopy);
  };
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);  
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);  
    });

    
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <View style={[styles.container, keyboardVisible ? { paddingBottom: 350 } : {}]}>
      <Modal
            animationType= "fade"
            transparent={true}
            visible={donePage}
            onRequestClose={() => {
              setDonePage(!donePage);
            }}>
              <View style={styles.pageBackground}>
                <View style={styles.pageLook}>
                <TouchableOpacity title="Close" onPress={() => setDonePage(false)} style={styles.closeB}>
                  <Text style={styles.closeText}>X</Text>
                </TouchableOpacity>
                <Text style={styles.title2}>Done Tasks</Text>
                <ScrollView>
                {
                doneItems.map((item, index) =>{
                  return (
                  <TouchableOpacity key={index} onPress={() => deleteD(index)}>
                  <Task  text={item} done={true} />
                  </TouchableOpacity>
                  )
                })
                }
                </ScrollView>
                </View>
              </View>
          </Modal>
      {/*Today's Task */}
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Today's Tasks</Text>
        <ScrollView style={styles.items}>
          {/* This is where the tasks will be contained */}
          {
            taskItems.map((item, index) =>{
              if(item == null){
                return null;
              }

              return (
              <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                <Task  text={item}/>
              </TouchableOpacity>
              );
            })
          }
          
        </ScrollView>
      </View>

      {/* Write task */}
      <KeyboardAvoidingView 
      behaviour={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      style={styles.writeTaskWrapper}>

        <TextInput style={styles.input} placeholder={"Write a task"} value={task} onChangeText={text =>setTask(text)}/>
        <TouchableOpacity onPress={() => setDonePage(true)}>
          <View style={styles.doneTask}>
            <Text style={styles.fontSize = 15}>✅</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
     </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
  },
  tasksWrapper : {
    paddingTop: 80,
    paddingHorizontal: 25,
  },
  sectionTitle : {
    fontSize: 28,
    fontWeight: "bold",
  },
  items : {
    marginTop:30,
    height: '80%',
  },
  writeTaskWrapper: {
    position: 'relative',
    bottom: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: 'white',
    borderRadius: 60,
    borderWidth: 1,
    borderColor: '#C0C0C0',
    width: 250,
  } ,
  addWrapper:   {
    backgroundColor: 'white',
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 23,
    borderWidth: 1,
    borderColor: '#C0C0C0',
  },
  addText: {
    fontSize: 23,
  },
  doneTask: {
    backgroundColor: 'white',
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#C0C0C0',
  },
  pageBackground: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 1, 0, 0.2)',
    height: '100%',
  },
  pageLook: {
    width: '80%',
    height: 500,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    paddingTop: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeB: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#C0C0C0',
    backgroundColor: 'rgb(214, 64, 64)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    marginTop: 1,
    fontSize: 15,
    color: '#C0C0C0',
    elevation: 5,
  },
  title2: {
    fontWeight: 'bold',
    position: 'absolute',
    top: 10,
    alignSelf: 'center',
  }
});
