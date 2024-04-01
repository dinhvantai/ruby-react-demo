class CreateVideos < ActiveRecord::Migration[7.1]
  def change
    create_table :videos do |t|
      t.integer :user_id
      t.string :title
      t.string :full_url
      t.string :video_id
      t.text :description
      t.timestamps
    end
  end
end
