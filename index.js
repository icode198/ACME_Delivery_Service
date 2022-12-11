// Import stylesheets
import './style.css';

// Write Javascript code!
const appDiv = document.getElementById('app');
appDiv.innerHTML = `<h1>JS Starter</h1>`;

class Graph {
  constructor(graph) {
    this.nodes = {};
    let edges = graph.replaceAll(' ', '').split(',');
    this.weights = {};
    this.adjs = {}; // adjacencies
    for (let edge of edges) {
      let from = edge[0];
      let to = edge[1];

      this.nodes[from] = 0;
      this.nodes[to] = 0;

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
    visited[from]++;

    if (path.length > 1 && from === to) {
      this.routes.push(path.join(''));
      // console.log(visited);
      return;
    }

    for (let adj of this.adjs[from]) {
      if (visited[adj] < this.sameRouteMax) {
        this.DFS(adj, to, { ...visited }, [...path, adj]);
      }
    }
  }

  getDeliveryRoutes(from, to, stopsMax = Infinity, sameRouteMax = 1) {
    if (this.nodes[from] === undefined || this.nodes[to] === undefined) {
      return [];
    }

    this.from = from;
    this.to = to;
    this.stopsMax = stopsMax;
    this.sameRouteMax = sameRouteMax;

    this.routes = []; // possible delivery routes

    this.DFS(from, to, { ...this.nodes }, [from]);

    return this.routes;
  }

  getCostOfCheapestDeliveryRoute() {
    let min = Infinity;
    let cheapestRoute = '';
    for (let route of this.routes) {
      let cost = this.getDeliveryCostOfRoute(route);
      if (cost < min) {
        min = cost;
        cheapestRoute = route;
      }
    }
    // console.log(cheapestRoute);
    return min;
  }
}

let graph = new Graph('AB1, AC4, AD10, BE3, CD4, CF2, DE1, EB3, EA2, FD1');

// console.log(graph.adjs);
// console.log(graph.weights);

console.log(graph.getDeliveryCostOfRoute('A-B-E'));
console.log(graph.getDeliveryCostOfRoute('A-D'));
console.log(graph.getDeliveryCostOfRoute('EACF'));
console.log(graph.getDeliveryCostOfRoute('ADF'));

console.log(graph.getDeliveryRoutes('E', 'D', 4, 1).length);
console.log(graph.getCostOfCheapestDeliveryRoute());

console.log(graph.getDeliveryRoutes('E', 'E', 4, 2).length);
console.log(graph.getCostOfCheapestDeliveryRoute());
