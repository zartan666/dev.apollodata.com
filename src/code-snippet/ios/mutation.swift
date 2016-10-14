import UIKit
import Apollo

class PostListViewController: UITableViewController {
  var posts: [AllPostsQuery.Data.Post]? {
    didSet {
      tableView.reloadData()
    }
  }

  // MARK: - View lifecycle

  override func viewWillAppear(_ animated: Bool) {
    super.viewWillAppear(animated)

    loadData()
  }

  // MARK: - Data loading

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

    let post = posts?[indexPath.row]

    cell.configure(with: post?.fragments.postDetails)

    return cell
  }
}

class PostTableViewCell: UITableViewCell {
  var postId: Int?

  @IBOutlet weak var titleLabel: UILabel!
  @IBOutlet weak var bylineLabel: UILabel!
  @IBOutlet weak var votesLabel: UILabel!

  func configure(with post: PostDetails?) {
    postId = post?.id

    titleLabel?.text = post?.title
    bylineLabel?.text = byline(for: post)
    votesLabel?.text = "\(post?.votes ?? 0) votes"
  }

  @IBAction func upvote() {
    guard let postId = postId else { return }

    apollo.perform(mutation: UpvotePostMutation(postId: postId)) { (result, error) in
      self.configure(with: result?.data?.upvotePost?.fragments.postDetails)
    }
  }
}

// We can define helper methods that take the generated data types as arguments

func byline(for post: PostDetails?) -> String? {
  if let author = post?.author {
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
