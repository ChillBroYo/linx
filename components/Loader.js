import React from 'react';
import {
    ActivityIndicator,
    Modal,
    StyleSheet,
    View,
} from 'react-native';

export default function Loader({ visible }) {
    return (
        <Modal transparent={true} visible={visible}>
            <View style={styles.container}>
                <ActivityIndicator size='large' />
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
