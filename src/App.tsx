import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {caseGroups, type GradientCase} from './cases';

const GradientTile = ({item}: {item: GradientCase}) => (
  <View style={styles.cell} testID={`case-${item.id}`}>
    <View style={styles.backdrop}>
      <View
        style={[
          styles.tile,
          item.extraStyle,
          {experimental_backgroundImage: item.backgroundImage},
        ]}
      />
    </View>
    <Text style={styles.caseId}>{item.id.toUpperCase()}</Text>
    <Text style={styles.label}>{item.label}</Text>
    <Text style={styles.expected}>Expected: {item.expected}</Text>
  </View>
);

export const App = () => (
  <ScrollView style={styles.root} contentContainerStyle={styles.content}>
    <Text style={styles.title}>experimental_backgroundImage on Vega</Text>
    {caseGroups.map((group) => (
      <View key={group.id} style={styles.group}>
        <Text style={styles.groupTitle}>{group.title}</Text>
        <Text style={styles.groupDescription}>{group.description}</Text>
        <View style={styles.grid}>
          {group.cases.map((item) => (
            <GradientTile key={item.id} item={item} />
          ))}
        </View>
      </View>
    ))}
  </ScrollView>
);

const TILE_WIDTH = 200;
const TILE_HEIGHT = 56;

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: '#111111'},
  content: {paddingHorizontal: 32, paddingVertical: 20},
  title: {color: '#ffffff', fontSize: 22, fontWeight: '600', marginBottom: 8},
  group: {marginTop: 12},
  groupTitle: {color: '#ffffff', fontSize: 16, fontWeight: '600'},
  groupDescription: {color: '#aaaaaa', fontSize: 11, marginBottom: 8},
  grid: {flexDirection: 'row', flexWrap: 'wrap', gap: 16},
  cell: {width: TILE_WIDTH},
  // Neutral grey so "transparent" and "nothing painted" are both visible.
  backdrop: {
    width: TILE_WIDTH,
    height: TILE_HEIGHT,
    backgroundColor: '#808080',
  },
  tile: {width: TILE_WIDTH, height: TILE_HEIGHT},
  caseId: {color: '#ffffff', fontSize: 11, fontWeight: '700', marginTop: 4},
  label: {color: '#dddddd', fontSize: 10},
  expected: {color: '#888888', fontSize: 10},
});
