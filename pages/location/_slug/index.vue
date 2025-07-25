<template>
  <div class="container mx-auto">
    <div class="flex justify-center mb-10">
      <nuxt-img
        loading="lazy"
        decoding="async"
        :src="imgB64 || `/images/location/${post.image}`"
        :alt="post.title"
        :title="post.title"
        class="object-cover w-full aspect-[16/9] md:w-2/3"
        format="webp"
      />
    </div>
    <form class="flex my-5 gap-5" v-if="isDev" @submit.prevent="uploadImage">
      <input
        class="border rounded-md flex-1"
        v-model="imageURL"
        placeholder="Upload image url"
      />
      <input
        type="file"
        accept="img/*"
        @change="image"
        placeholder="Upload image url"
      />
      <Button :loading="!click">Upload</Button>
    </form>
    <div class="flex flex-col my-5 gap-5" v-if="isDev">
      <form class="flex gap-5" @submit.prevent="addText">
        <input
          class="border rounded-md flex-1"
          v-model="text"
          placeholder="Replace text"
        />
        <Button type="submit">add</Button>
      </form>
      <div v-if="texts && texts.length">
        <p
          v-for="(t, i) in texts"
          :key="i"
          @click="texts.splice(i, 1)"
          class="cursor-pointer"
        >
          {{ i + 1 }}. {{ t }}
        </p>
      </div>
      <template v-if="convert && convert.length">
        <div v-for="(t, i) in convert" :key="'g' + i" class="mb-4">
          <p>{{ i + 1 }}</p>
          <p>text: {{ t.text }}</p>
          <p>Generate: {{ t.generate }}</p>
        </div>
      </template>
      <p v-if="addError" class="bg-rose-50 text-rose-600 px-3">
        Can't add because this text isn't exist in this page
      </p>
      <div class="flex gap-10">
        <Button @click.native.prevent="copyPage" v-if="isDev" class="w-full"
          >Copy full page</Button
        >
        <Button
          @click.native.prevent="reload()"
          class="w-full"
          v-if="convert && convert.length"
        >
          verify
        </Button>
        <Button
          v-else
          @click.native.prevent="replace"
          class="w-full"
          :loading="replaceLoading"
        >
          Replace
        </Button>
      </div>
    </div>

    <div class="flex flex-col lg:flex-row gap-5 md:gap-10">
      <div class="flex-1">
        <LanguageSwitch />
        <div class="flex flex-col md:flex-row justify-between md:items-center">
          <h1
            class="text-3xl md:text-4xl font-bold tracking-tight dark:text-white lg:leading-snug capitalize"
          >
            <EditMode v-model="post.title" />
          </h1>

          <nuxt-link
            class="text-sm font-semibold uppercase text-blue-600"
            :to="{
              name: 'district-name-page',
              params: { name: post.district, page: 1 },
            }"
            title="post.district"
          >
            {{ post.district }}
          </nuxt-link>
        </div>
        <div class="flex items-center justify-between gap-2 mb-7">
          <div class="flex items-center text-sm gap-2">
            <p class="text-gray-800 dark:text-gray-400">Shafayet Al-Anik</p>
            ·
            <p class="truncate text-sm">{{ post.postDate | cDate }}</p>
          </div>
        </div>
        <div
          class="flex justify-between items-center w-full mb-10"
          v-if="isDev"
        >
          <div>
            <p @click="copyText(post._id)" class="cursor-pointer">
              {{ post._id }}
            </p>
            <a :href="post.url" target="_blank">{{ post.url }}</a>
          </div>
          <!-- <form @submit.prevent="submit">
            <input
              type="text"
              v-model="title"
              class="border w-full h-20 bg-blue-600 text-white mt-10"
              @click="paste"
            />
          </form> -->
        </div>
        <div
          v-for="(content, key) in post.content"
          :key="`content-${key}`"
          class="mb-7 relative"
        >
          <div class="absolute right-0 top-0 flex gap-5 text-xl" v-if="isDev">
            <i class="fa-regular fa-copy cursor-pointer" @click="copy(key)"></i>
            <i
              class="fas fa-trash-can cursor-pointer"
              @click="deleteContent(key)"
            ></i>
          </div>
          <h2
            v-if="content.title"
            class="text-2xl font-bold mb-2 tracking-tight capitalize"
          >
            <EditMode v-model="content.title" />
          </h2>
          <h2
            v-else-if="key === 0"
            class="text-2xl font-bold mb-2 capitalize tracking-tight"
          >
            Introduction to {{ post.title }}
          </h2>
          <article class="mb-10">
            <div
              v-for="(article, i) in content.content"
              :key="`article-${i}`"
              class="mb-4"
            >
              <EditMode v-model="content.content[i]" tagName="div" />
            </div>
          </article>
          <hr v-if="key + 1 !== post.content.length" />
        </div>
        <div class="flex justify-between gap-10" v-if="isDev">
          <Button class="w-full" @click.native.prevent="updatePost"
            >Update</Button
          >
          <Button class="w-full" @click.native.prevent="refetch"
            >Refetch</Button
          >
        </div>
      </div>
      <div class="lg:w-80">
        <h2 class="md:text-4xl text-3xl font-bold mb-3">Related Post</h2>
        <div class="grid md:grid-cols-3 lg:grid-cols-1 gap-5 lg:gap-10">
          <LocationSinglePost
            v-for="(post, key) in related"
            :key="key + 'i'"
            :post="post"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import { meta } from "@/utils";
export default {
  head() {
    const title = `${this.post.title} | ${this.$pageTitle}`;
    const description =
      `${this.post?.content[0]?.content[0]?.slice(0, 150)}...` ||
      "Discover the beauty of Bangladesh with CholoZai. Explore top destinations, hidden gems, cultural experiences, and travel tips for an unforgettable journey through this vibrant country.";
    const mainEntity = this.post.content
      .filter(({ title }) => title && title.length)
      .map(({ title, content }) => ({
        "@type": "Question",
        name: `${title}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: content.join(" "),
        },
      }));

    let position = 1;

    const breadcrumbList = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: position++,
          name: "Home",
          item: `${this.baseUrl}${this.$router.resolve("/").href}`,
        },
        ...(this.division
          ? [
              {
                "@type": "ListItem",
                position: position++,
                name: this.division.name,
                item: `${this.baseUrl}${
                  this.$router.resolve(`/division/${this.division.slug}/1`).href
                }`,
              },
            ]
          : []),
        {
          "@type": "ListItem",
          position: position++,
          name: this.post.district,
          item: `${this.baseUrl}${
            this.$router.resolve(`/district/${this.post.district}/1`).href
          }`,
        },
        {
          "@type": "ListItem",
          position: position++,
          name: this.post.title,
          item: `${this.baseUrl}${this.$route.fullPath}`,
        },
      ],
    };

    return {
      title,
      meta: meta({ title, description }),
      link: [
        {
          rel: "alternate",
          href: `${this.baseUrl + this.$route.path}/bn`,
          hreflang: "bn-BD",
        },
        {
          rel: "canonical",
          href: `${this.baseUrl + this.$route.path}`,
        },
      ],
      script: [
        {
          type: "application/ld+json",
          json: {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity,
          },
        },
        {
          type: "application/ld+json",
          json: {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: title,
            author: {
              "@type": "Person",
              name: "Shafayet Al-Anik",
            },
            datePublished: new Date(
              this.post.postDate || new Date()
            ).toISOString(),
            image: `${this.baseUrl}/images/location/${this.post.image}`,
            description: description,
          },
        },
        {
          type: "application/ld+json",
          json: breadcrumbList,
        },
      ],
    };
  },
  async asyncData(context) {
    try {
      const { store, error, route } = context;
      const { params } = route;
      const { apiUrl } = store.getters;
      const slug = params.slug;
      let res = await axios.get(`${apiUrl}/fetch/post/${slug}`);
      if (res.data?.post) {
        const { post, related, division } = res.data;
        return { post, related, division };
      } else {
        error({ statusCode: 404, message: "Not found" });
      }
    } catch (err) {
      console.error(err);
      const { error } = context;
      error({
        statusCode: 500,
        message: "Something wrong. Please try again 2",
      });
    }
  },
  data() {
    return {
      post: {},
      related: {},
      division: {},
      title: "",
      imageURL: "",
      convert: [],
      texts: [],
      text: "",
      click: true,
      addError: false,
      replaceLoading: false,
      imgB64: "",
    };
  },
  computed: {
    ...mapGetters(["isDev", "baseUrl"]),
  },
  methods: {
    copyText(text) {
      navigator.clipboard.writeText(text);
    },
    async copyPage() {
      try {
        const content = `${this.post.title}\n${
          this.post.district
        }\n${this.post.content
          .map((item) => `${item.title}\n${item.content.join("\n\n")}`)
          .join("\n\n")}`;

        await navigator.clipboard.writeText(content);
      } catch (err) {
        console.error("Failed to copy text:", err);
      }
    },
    async paste() {
      this.title = await navigator.clipboard.readText();
      this.submit();
    },
    async submit() {
      try {
        // await this.$axios.$post(`${this.$api}/scrap/update-post-slug`, {
        //   title: this.title,
        //   post: this.post,
        // });
        this.title = "";
      } catch (error) {}
    },
    async updatePost() {
      try {
        await this.$axios.$post(
          `${this.$api}/scrap/update-post-manually`,
          this.post
        );
        this.title = "";
      } catch (error) {}
    },
    async refetch() {
      try {
        await this.$axios.$get(`${this.$api}/scrap/refetch/${this.post.slug}`);
      } catch (error) {}
    },
    copy(i) {
      this.post.content.splice(i, 0, this.post.content[i]);
    },
    deleteContent(i) {
      this.post.content.splice(i, 1);
    },
    async uploadImage() {
      if (this.click) {
        try {
          this.click = false;
          await this.$axios.$post(`${this.$api}/scrap/upload/image`, {
            url: this.imageURL,
            post: this.post,
            img: this.imgB64,
          });
          this.imageURL = "";
          this.imgB64 = "";
        } catch (error) {
        } finally {
          this.click = true;
        }
      }
    },
    async replace() {
      if (this.click) {
        try {
          this.click = false;
          this.replaceLoading = true;
          this.generate = [];
          const { convert } = await this.$axios.$post(
            `${this.$api}/scrap/replace`,
            {
              texts: this.texts,
              post: this.post,
            }
          );
          // location.reload();
          this.convert = convert;
          this.texts = [];
          this.text = "";
        } catch (error) {
          console.log(error);
        } finally {
          this.replaceLoading = false;
          this.click = true;
        }
      }
    },
    addText() {
      const regex = new RegExp(this.text, "i");

      if (
        (this.post.content.some((item) =>
          item.content.some((contentText) => regex.test(contentText))
        ) ||
          this.post.bnContent.some((item) =>
            item.content.some((contentText) => regex.test(contentText))
          )) &&
        !this.texts.includes(this.text)
      ) {
        this.texts.push(this.text);
        this.text = "";
        this.addError = false;
      } else {
        this.addError = true;
      }
    },
    reload() {
      window.location.reload();
    },
    // show Selected image
    image(event) {
      if (event.target.files.length > 0) {
        let file = event.target.files[0];
        let reader = new FileReader();
        reader.onloadend = () => {
          this.imgB64 = reader.result;
        };
        reader.readAsDataURL(file);
        // this.form.logo = file;
      }
    },
  },
};
</script>
