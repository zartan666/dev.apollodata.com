import UIKit
import Apollo

class PostListViewController: UITableViewController {
  var posts: [AllPostsQuery.Data.Post]? {
    didSet {
      tableView.reloadData()
    }
  }

  // MARK: - View lifecycle

  override func viewDidLoad() {
    super.viewDidLoad()

    tableView.rowHeight = UITableViewAutomaticDimension
    tableView.estimatedRowHeight = 64
  }

  override func viewWillAppear(_ animated: Bool) {
    super.viewWillAppear(animated)

    loadData()
  }

  // MARK: - Data loading

  func loadData() {
    apollo.fetch(query: AllPostsQuery()) { (result, error) in
      if let error = error {
        NSLog("Error while fetching query: \(error.localizedDescription)")
        return
      }

      self.posts = result?.data?.posts
    }
  }

  // MARK: - UITableViewDataSource

  override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
    return posts?.count ?? 0
  }

  override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
    guard let cell = tableView.dequeueReusableCell(withIdentifier: "Cell", for: indexPath) as? PostTableViewCell else {
      fatalError("Could not dequeue PostTableViewCell")
    }

    guard let post = posts?[indexPath.row] else {
      fatalError("Could not find post at row \(indexPath.row)")
    }

    cell.configure(with: post.fragments.postDetails)

    return cell
  }
}

class PostTableViewCell: UITableViewCell {
  var postId: Int?

  @IBOutlet weak var titleLabel: UILabel!
  @IBOutlet weak var bylineLabel: UILabel!
  @IBOutlet weak var votesLabel: UILabel!

  func configure(with post: PostDetails) {
    postId = post.id

    titleLabel?.text = post.title
    bylineLabel?.text = byline(for: post)
    votesLabel?.text = "\(post.votes ?? 0) votes"
  }

  @IBAction func upvote() {
    guard let postId = postId else { return }

    apollo.perform(mutation: UpvotePostMutation(postId: postId)) { (result, error) in
      if let error = error {
        NSLog("Error while attempting to upvote post: \(error.localizedDescription)")
        return
      }

      guard let upvotePost = result?.data?.upvotePost else {
        NSLog("Missing result after upvoting post")
        return
      }

      self.configure(with: upvotePost.fragments.postDetails)
    }
  }
}

// We can define helper methods that take the generated data types as arguments

func byline(for post: PostDetails) -> String? {
  if let author = post.author {
    return "by \(author.fullName)"
  } else {
    return nil
  }
}

// We can also extend the generated data types to add convenience properties and methods

extension PostDetails.Author {
  var fullName: String {
    return [firstName, lastName].flatMap { $0 }.joined(separator: " ")
  }
}

/////////////////////////////////////////////////////////////////////////////////////////

query AllPosts {
  posts {
    ...PostDetails
  }
}

fragment PostDetails on Post {
  id
  title
  votes
  author {
    firstName
    lastName
  }
}

mutation UpvotePost($postId: Int!) {
  upvotePost(postId: $postId) {
    ...PostDetails
  }
}
