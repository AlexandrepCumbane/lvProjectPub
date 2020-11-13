from django.contrib.auth.models import User
from django.test import TestCase
from rest_framework.test import APIClient, force_authenticate

from posts_management.api.serializers import PostSerializer
from posts_management.models import Post, PostCategory, PostLanguage


# Create your tests here.
class PostAPITestCase(TestCase):
    def setUp(self):
        self.client = APIClient()

        user_data = {
            "email": "test@mail.com",
            "username": "test",
            "password": "Test123.",
        }

        user = User(**user_data)
        user.save()

        self.post_language = PostLanguage(name="Portugues")
        self.post_language.save()

        self.post_category = PostCategory(name="categoria1")
        self.post_category.save()

        post_data = {
            "title": "Post1",
            "text": "<h2>Este e um post importante</h2>",
            "category": self.post_category,
            "language": self.post_language,
            "created_by": user,
            "aproved_by": user,
            "assigned_to": user,
            "published_date": "2020-09-05",
            "expiration_date": "2021-01-01",
        }

        post = Post(**post_data)
        post.save()

        self.client.force_authenticate(user=user)

    def test_user_can_read_posts(self):
        response = self.client.get("/api/v1/posts/")
        self.assertEquals(response.status_code, 200)

    def test_user_data_is_valid(self):
        post_data = {
            "id": 1,
            "title": "Post132",
            "text": "<h2>Este e um post importante</h2>",
            "category": self.post_category.pk,
            "language": self.post_language.pk,
            "created_by": User.objects.first().pk,
            "aproved_by": User.objects.first().pk,
            "assigned_to": User.objects.first().pk,
            "published_date": "2030-09-05",
            "expiration_date": "2031-01-01",
        }

        post_serializer = PostSerializer(Post.objects.first(), post_data)

        self.assertTrue(post_serializer.is_valid())

    def test_user_can_save_post(self):
        post_data = {
            "title": "Vasco Post",
            "text": "<h2>Este e um post importante</h2>",
            "category": self.post_category.pk,
            "language": self.post_language.pk,
            "created_by": User.objects.first().pk,
            "aproved_by": User.objects.first().pk,
            "assigned_to": User.objects.first().pk,
            "published_date": "2020-09-05",
            "expiration_date": "2021-01-01",
        }

        response = self.client.post("/api/v1/posts/", post_data)

        self.assertEquals(response.status_code, 201)

    def test_cant_save_post_with_existent_title(self):
        post_data = {
            "title": "Post1",
            "text": "<h2>Este e um post importante</h2>",
            "category": self.post_category.pk,
            "language": self.post_language.pk,
            "created_by": User.objects.first().pk,
            "aproved_by": User.objects.first().pk,
            "assigned_to": User.objects.first().pk,
            "published_date": "2020-09-05",
            "expiration_date": "2021-01-01",
        }

        response = self.client.post("/api/v1/posts/", post_data)

        self.assertEquals(response.status_code, 400)

    def test_user_can_edit_post(self):
        url = "/api/v1/posts/{0}/".format(Post.objects.first().pk)
        post_data = {
            "title": "Post132",
            "text": "<h2>Este e um post importante</h2>",
            "category": self.post_category.pk,
            "language": self.post_language.pk,
            "created_by": User.objects.first().pk,
            "aproved_by": User.objects.first().pk,
            "assigned_to": User.objects.first().pk,
            "published_date": "2030-09-05",
            "expiration_date": "2031-01-01",
        }

        response = self.client.put(url, post_data)

        self.assertEquals(response.status_code, 200)
