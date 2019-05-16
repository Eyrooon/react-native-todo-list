import React, { Component } from 'react';
import {
    View,
    Text, 
    StyleSheet, 
    FlatList, 
    TextInput, 
    Button, 
    Alert, 
    TouchableOpacity
} from 'react-native';

class Todo extends Component {
    constructor (props) {
        super(props);
        this.state = {
            allData: [],
            item: '',
            toUpdate: false
        };
        this.handleAdd = this.handleAdd.bind(this);
        this.handleText = this.handleText.bind(this);
        this.handleComplete = this.handleComplete.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    };

    handleText (text) {
        this.setState({item: text})
    }

    handleAdd () {
        if (Boolean(this.state.item.trim())) {
        this.state.allData.push({key: this.state.item});
        this.setState({
            item: '',
            toUpdate: !this.state.toUpdate
        });
        } else {
            Alert.alert('Empty Text. Try Again!');
        }
    }

    handleComplete (index) {
        const item = this.state.allData[index];
        item.completed = !item.completed;
        this.setState({toUpdate: !this.state.toUpdate});
    }

    handleDelete (index) {
        this.state.allData.splice(index, 1);
        this.setState({toUpdate: !this.state.toUpdate});
    }

    render () {
        return (
            <View style={{width: 300}}>
                <Text style={styles.header}>To-Do List</Text>
                <Text style={styles.subHeader}>How to use:</Text>
                <Text>1. Click text field and type the text you want</Text>
                <Text>2. Click Add Button to insert the item you type in text field</Text>
                <Text>3. To Complete an item just tap the text of each item</Text>
                <Text>4. To remove an item just click the X button</Text>
                <TextInput
                    placeholder="Add Item"
                    style={styles.textFieldStyle}
                    onChangeText={this.handleText}
                    value={this.state.item}
                    maxLength={40}
                />
                <TouchableOpacity onPress = {this.handleAdd}>
                    <View style = {{backgroundColor: 'blue', alignItems: 'center', 
                                    justifyContent: 'center', borderRadius: 15, 
                                    padding: 2, marginBottom: 5
                            }}
                        >
                        <Text style = {{color: 'white'}}>Add</Text>
                    </View>
                </TouchableOpacity>
                <FlatList
                    data={this.state.allData}
                    renderItem={({item, index}) =>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3}}>
                            <Text
                                onPress={() => this.handleComplete(index)}
                                style={{
                                    textDecorationLine: item.completed ? 'line-through' : 'none',
                                    color: item.completed ? 'red' : 'black',
                                    marginBottom: 5
                                }}
                            >{item.key}</Text>
                            <Button
                                style={{
                                    width: 10,
                                    height: 5,
                                    padding: 0
                                }}
                                color="red"
                                title="X"
                                onPress={() => this.handleDelete(index)}
                            />
                        </View>
                    }
                    extraData={this.state}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        fontSize: 20,
        marginBottom: 10
    },
    subHeader: {
        fontSize: 15,
        marginBottom: 10
    },
    textFieldStyle: {
        borderWidth: 1, 
        borderColor: 'rgba(0,0,0,0.5)',
        marginTop: 5,
        marginBottom: 5
    },
    itemStyle: {
        textDecorationLine: 'line-through'
    }
  });
  

export default Todo;