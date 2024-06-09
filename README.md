## Yuzu

***Yuzu*** is a text-first social media platform that focuses on creating communities around all kinds of things.  

## Application Documentation
Please read further into the documentation to learn more about the complexity of this project. 
[Documentation](https://agrumi.gitbook.io/yuzu/)

## Architecture

The platform is built using several technologies:

* Frontend: TypeScript, React
* Mobile Client: Swift
* Post service: Go
* Feed service: Go
* User service: Node.js, TypeScript
* Data storage: Cassandra, Redis, PostgreSQL
* Search: Elasticsearch
* Message Queue: Kafka

## [Frontend](https://github.com/cal1co/yuzu)

- The frontend is built using TypeScript and React. It allows users to sign up, log in, and interact with the platform by creating posts, commenting, liking, sharing, and searching for other users and posts. The interface is responsive and user-friendly.

## [Post Service](https://github.com/cal1co/yuzu-posthandler)

- The post service is written in Go. It is responsible for handling all post-related operations, including creating, updating, and deleting posts, as well as handling likes, comments, and sharing. It interacts with the Cassandra database to store and retrieve post data, and uses Redis as a cache to speed up post ranking and data retrieval.

## [Feed Service](https://github.com/cal1co/yuzu-feed)

- The feed service is written in Go. It is responsible for creating, reading, updating, and deleting feeds for users. It interacts with Cassandra and Kafka to fetch posts and sorted and stored with Redis. 
- When a user follows another user, their posts are added to their feed. Posts are removed on unfollow
- When a user connects to the home page, a websocket connection is created which connects to the Kafka queue. When posts are added to a users feed, a notification is shown
- Active users get fanout on post, inactive users get fanout on read. This reduces loads for the servers by prioritising users that use the application more often 

## [User Service](https://github.com/cal1co/yuzu-login)

- The user service is written in Node. It is responsible for user profile related operations. It interacts with PostgreSQL to store user information and S3 to store user profile images.


## [Mobile Frontend](https://github.com/cal1co/yuzu-mobile)
- The mobile frontend is written in Swift. It is highly performant and includes an understandable and smooth UI. User experience was a priority when developing this portion of the application. 

Feed:
https://github.com/cal1co/yuzu/assets/95969608/0833f94c-fd06-43dd-b7f0-88508f2e3bc5

Search:
https://github.com/cal1co/yuzu/assets/95969608/b43a3fed-21fa-4fd4-b552-296ec910b687

Post:
https://github.com/cal1co/yuzu/assets/95969608/7670e686-663f-4a9c-9c04-af2862e58f59

Upload:
https://github.com/cal1co/yuzu/assets/95969608/395e403f-5d0d-4851-b7a4-50e65bbd7257

Profile:
https://github.com/cal1co/yuzu/assets/95969608/049bc27a-7f61-463e-bcbc-a734e321532c


## Data Storage

- The platform uses Cassandra as its primary database to store post data, including post content, likes, and comments. Cassandra provides high availability, scalability, and fault tolerance, which are important features for a social media platform. 
- Redis is used as a cache to speed up post ranking and data retrieval.
- PostgreSQL is used for user related storage as complex queries are sometimes required 

## Search

- The platform uses Elasticsearch to provide fuzzy search capabilities for posts and users. Elasticsearch provides fast and efficient search operations, even with large amounts of data.
Deployment

## Caching
- For fast and reliable time-sensitive data, redis is used to store and serve content at lightning quick speeds. User feeds are stored in Redis in sorted sets in the form of postids and sorted by the date of the posts.

## Deployment

- The platform is deployed using Docker containers, making it easy to deploy and scale. The following Docker containers are used:

* Frontend container: runs the frontend application
* Post service container: runs the Go post service
* Postgresql container: runs the postgres service 
* Feed service container: runs the Go post service
* Cassandra container: runs the Cassandra database
* Redis containers: runs post interaction counter cache and user feed cache
* Elasticsearch container: runs the Elasticsearch search engine

## Conclusion

Yuzu is a social media platform that provides a wide range of features for users to connect and share their interests. The platform is built using modern technologies and can be easily deployed and scaled.
