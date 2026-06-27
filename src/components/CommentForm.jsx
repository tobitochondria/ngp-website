import { useState } from 'react'
import './CommentForm.css'

export default function CommentForm() {
  const [form, setForm] = useState({ comment: '', name: '', email: '', website: '' })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // submission logic placeholder
  }

  return (
    <section className="comment-form-section" aria-labelledby="comment-form-title">
      <div className="comment-form-container">
        <h2 id="comment-form-title" className="comment-form__title">Leave a Reply</h2>
        <p className="comment-form__subtitle">
          Your email address will not be published. Required fields are marked <span aria-hidden="true">*</span>
        </p>

        <form className="comment-form" onSubmit={handleSubmit} noValidate>
          <div className="comment-form__group">
            <label htmlFor="cf-comment" className="comment-form__label">
              Comment <span className="comment-form__required" aria-hidden="true">*</span>
            </label>
            <textarea
              id="cf-comment"
              name="comment"
              className="comment-form__textarea"
              rows={7}
              required
              value={form.comment}
              onChange={handleChange}
              aria-required="true"
            />
          </div>

          <div className="comment-form__row">
            <div className="comment-form__group">
              <label htmlFor="cf-name" className="comment-form__label">
                Name <span className="comment-form__required" aria-hidden="true">*</span>
              </label>
              <input
                id="cf-name"
                name="name"
                type="text"
                className="comment-form__input"
                required
                value={form.name}
                onChange={handleChange}
                aria-required="true"
              />
            </div>
            <div className="comment-form__group">
              <label htmlFor="cf-email" className="comment-form__label">
                Email <span className="comment-form__required" aria-hidden="true">*</span>
              </label>
              <input
                id="cf-email"
                name="email"
                type="email"
                className="comment-form__input"
                required
                value={form.email}
                onChange={handleChange}
                aria-required="true"
              />
            </div>
          </div>

          <div className="comment-form__group">
            <label htmlFor="cf-website" className="comment-form__label">Website</label>
            <input
              id="cf-website"
              name="website"
              type="url"
              className="comment-form__input"
              value={form.website}
              onChange={handleChange}
            />
          </div>

          <button id="cf-submit" type="submit" className="comment-form__submit">
            POST COMMENT
          </button>
        </form>
      </div>
    </section>
  )
}
