import UIKit
import Apollo

let apollo = ApolloClient(url: URL(string: "http://localhost:8080/graphql")!)

class PostListViewController: UITableViewController {
  var posts: [AllPostsQuery.Data.Post]? {
    didSet {
      tableView.reloadData()
    }
  }

  override func viewWillAppear(_ animated: Bool) {
    super.viewWillAppear(animated)

    loadData()
  }

  func loadData() {
    apollo.fetch(query: AllPostsQuery()) { (result, error) in
      self.posts = result?.data?.posts
    }
  }

  // MARK: - UITableViewDataSource

  override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
    return posts?.count ?? 0
  }

  override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
    let cell = tableView.dequeueReusableCell(withIdentifier: "Cell", for: indexPath) as! PostTableViewCell
    cell.configure(with: posts![indexPath.row].fragments.postDetails)
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
