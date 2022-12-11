// Import stylesheets
import './style.css';

// Write Javascript code!
const appDiv = document.getElementById('app');
appDiv.innerHTML = `<h1>JS Starter</h1>`;

class Graph {
  constructor(graph) {
    let edges = graph.replaceAll(' ', '').split(',');
    this.adjs = {}; // adjacencies
    this.weights = {};
    for (let edge of edges) {
      let from = edge[0];
      let to = edge[1];
      let weight = Number(edge.slice(2));

      if (this.adjs[from] === undefined) {
        this.adjs[from] = [to];
      } else {
        this.adjs[from].push(to);
      }
      this.weights[from + to] = weight;
    }
  }

  getDeliveryCostOfRoute(route) {
    let nodes = route.replaceAll('-', '').split('');
    let len = nodes.length;
    let cost = 0;
    for (let i = 0; i < len - 1; i++) {
      let w = this.weights[nodes[i] + nodes[i + 1]];
      if (w === undefined) return 'No Such Route';
      cost += w;
    }
    return cost;
  }

  DFS(from, to, visited, path) {
    if (from === to) {
      this.routes.push(path.join(''));
      return;
    }

    visited[from]++;
    for (let adj of this.adjs[from]) {
      if (visited[adj] < this.sameRouteMax) {
        this.DFS(adj, to, visited, [...path, adj]);
      }
    }
  }

  getDeliveryRoutes(from, to, stopsMax = Infinity, sameRouteMax = 1) {
    this.from = from;
    this.to = to;
    this.stopsMax = stopsMax;
    this.sameRouteMax = sameRouteMax;

    this.routes = []; // possible delivery routes

    // init visited
    let visited = {};
    for (let i = 0; i < 26; i++) {
      visited[String.fromCharCode('A'.charCodeAt(0) + i)] = 0;
    }

    this.DFS(from, to, visited, [from]);

    console.log(visited);

    return this.routes;
  }
}

let graph = new Graph('AB1, AC4, AD10, BE3, CD4, CF2, DE1, EB3, EA2, FD1');

console.log(graph.adjs);
console.log(graph.weights);

console.log(graph.getDeliveryCostOfRoute('A-B-E'));
console.log(graph.getDeliveryCostOfRoute('A-D'));
console.log(graph.getDeliveryCostOfRoute('EACF'));
console.log(graph.getDeliveryCostOfRoute('ADF'));

console.log(graph.getDeliveryRoutes('E', 'D'));
