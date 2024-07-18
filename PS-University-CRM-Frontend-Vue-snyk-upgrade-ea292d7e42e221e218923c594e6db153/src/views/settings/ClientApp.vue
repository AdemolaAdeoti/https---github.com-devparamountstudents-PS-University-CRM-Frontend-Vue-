<template>
  <div class="row w-90 mx-auto pt-3">
    <Toast />
    <h5 class="fw-bold">Client API</h5>
    <p>This API allows you to access your students data using the Client Credentials Grant authentication method.</p>
    <p></p>
    <div v-if="!apiEnabled">
      <Button raised @click="generateCredentials()" >
          <i class="pi pi-check px-2"></i>
          <span class="px-3">Generate Credentials</span>
          <i v-if="generating" class="pi pi-cog pi-spin px-2"></i>
      </Button>
    </div>
    <div v-else >      
      <h5>Authentication</h5>
      <p>This API uses OAuth 2.0 for authentication. Users need to obtain an access token using the Client Credentials
        Grant flow before accessing protected endpoints.</p>
        <div class="position-relative py-3 mb-4 border">
            <p class="bg-light position-absolute p-1" style="top: -15px;left:20px; ">Secrete Key</p>
            <Inplace>
              <template #display>
                <Button label="View" :pt="{root:{style:{padding:'2px 8px',marginLeft:'15px'}}}" />
              </template>
                <template #content>
                  <div class="d-flex align-content-center">
                    <InlineMessage severity="secondary" @dblclick="copyNow('72798nnakeu$92XHFE.ldiuwt333xcxwxfwv4iow','Secrete Key')">
                      72798nnakeu$92XHFE.ldiuwt333xcxwxfwv4iow
                    </InlineMessage>
                    <Button @click="copyNow('72798nnakeu$92XHFE.ldiuwt333xcxwxfwv4iow','Secrete Key')" icon="pi pi-copy" severity="info" outlined aria-label="copy" :pt="{root:{style:{padding:'1px', width:'28px'}}}"/>
                  </div>
                </template>
            </Inplace>        
        </div>
        <div class="position-relative py-3 mb-4 border">
            <p class="bg-light position-absolute p-1" style="top: -15px;left:20px; ">Client ID</p>
            <Inplace>
              <template #display>
                <Button label="View" :pt="{root:{style:{padding:'2px 8px',marginLeft:'15px'}}}" />
              </template>
                <template #content>
                  <div class="d-flex align-content-center">
                    <InlineMessage severity="secondary" @dblclick="copyNow('2372764','Client ID')">
                      2372764
                    </InlineMessage>
                    <Button @click="copyNow('2372764','Client ID')" icon="pi pi-copy" severity="info" outlined aria-label="copy" :pt="{root:{style:{padding:'1px', width:'28px'}}}"/>
                  </div>
                </template>
            </Inplace>        
        </div>
        
      <div class="row w-100">
        <div class="col-md-6">
          <h6 class="fw-bold">Example Request</h6>
          <highlightjs  language="json" code='
          POST /oauth/token HTTP/1.1
              Host: your-api.com
              Content-Type: application/json
  
              {
                  "grant_type": "client_credentials",
                  "client_id": "YOUR_CLIENT_ID",
                  "client_secret": "YOUR_CLIENT_SECRET"
              }
          ' />         
        </div>
        <div class="col-md-6">
          <h6 class="fw-bold">Example Response</h6>
          <highlightjs  language="json" code='
          {
              "access_token": "YOUR_ACCESS_TOKEN",
              "token_type": "Bearer",
              "expires_in": 3600
          }
          ' />    
        </div>
      </div>

      <!-- <Splitter style="height: 300px" class="mb-5">
        <SplitterPanel class="flex align-items-center justify-content-center"> Panel 1 </SplitterPanel>
        <SplitterPanel class="flex align-items-center justify-content-center"> Panel 2 </SplitterPanel>
    </Splitter -->
    <h5>Available Endpoints</h5>
    
   <!--  <TabView :scrollable="true">
        <TabPanel header="JavaScript">
            <p class="m-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
        </TabPanel>
        <TabPanel header="Java">
            <p class="m-0">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
                ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
            </p>
        </TabPanel>
        <TabPanel header="PHP">
            <p class="m-0">
                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui
                officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
            </p>
        </TabPanel>
    </TabView> -->
    

      <h2>Endpoints</h2>

      <div v-for="(endpoint,index) in endpoints" :key="index" class="endpoint">
          <h5>{{ endpoint?.name }}</h5>
          <ul >
            <li><strong>Method:</strong> {{endpoint.method}}</li>
            <li><strong>Endpoint:</strong> {{endpoint.url}}</li>
            <li>
              <strong>Headers:</strong>
              <ul>
                <li><code>Authorization: Bearer YOUR_ACCESS_TOKEN</code></li>
              </ul>
            </li>
          </ul>
          <pre>
            <code>
              {
                    "name": "Example University",
                    "location": "Example City",
                    "courses": [
                        {
                            "name": "Computer Science",
                            "duration": "4 years"
                        },
                        {
                            "name": "Physics",
                            "duration": "3 years"
                        }
                    ]
                }
          </code>
        </pre>
      </div>

      <h2>Error Handling</h2>
      <p>If there is an error during the authentication process or while accessing endpoints, appropriate error messages
        will be returned along with the corresponding HTTP status codes.</p>

      <h2>Example Implementations</h2>

      <h3>PHP</h3>
      <pre>
        <code class="language-php">
          // PHP implementation example
          // Using GuzzleHTTP client to send requests

          use GuzzleHttp\Client;

          $client = new Client();

          $response = $client->request('GET', 'https://your-api.com/api/university', [
              'headers' => [
                  'Authorization' => 'Bearer YOUR_ACCESS_TOKEN'
              ]
          ]);

          $body = $response->getBody();
          $data = json_decode($body, true);

          var_dump($data);
        </code>
      </pre>

      <h3>Java</h3>
      <pre>
        <code>
          // Java implementation example
          // Using OkHttp client to send requests

          import okhttp3.OkHttpClient;
          import okhttp3.Request;
          import okhttp3.Response;

          OkHttpClient client = new OkHttpClient();

          Request request = new Request.Builder()
                  .url("https://your-api.com/api/university")
                  .addHeader("Authorization", "Bearer YOUR_ACCESS_TOKEN")
                  .build();

          try (Response response = client.newCall(request).execute()) {
              String responseBody = response.body().string();
              System.out.println(responseBody);
          } catch (IOException e) {
              e.printStackTrace();
          }
          </code>
        </pre>

      <h3>JavaScript</h3>
      <pre>
        <code>
        // JavaScript implementation example
        // Using Fetch API to send requests

        fetch('https://your-api.com/api/university', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
            }
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
        </code>
      </pre>
    </div>    
  </div>
</template>

<script>
//   import { HTTP } from '@/api/client'; 
import 'highlight.js/lib/common';
import hljsVuePlugin from "@highlightjs/vue-plugin";
//import javascript from 'highlight.js/lib/languages/javascript';
//hljs.registerLanguage('javascript', javascript);

import Toast from 'primevue/toast';   
import Inplace from 'primevue/inplace';
import Button from 'primevue/button';

//import TabView from 'primevue/tabview';
//import TabPanel from 'primevue/tabpanel';


import InlineMessage from 'primevue/inlinemessage';


export default {
  name: "GeneralSettings",
  components: {Button,/* TabView, TabPanel,*/ highlightjs: hljsVuePlugin.component, Inplace, InlineMessage,Toast},
  data() {
    return {
      apiEnabled:false,
      generating:false,
      endpoints:[
        {name:'Fetch All Students', method:'Post || Get', url:'api/students',filters:{}},
        {name:'Fetch Student By id', method:'Get', url:'api/student/{student_id}',filters:{}},
        {name:'Update Student Application Status', method:'Post', url:'api/student/update_status',filters:{}},
        {name:'Fetch Student Receipts', method:'Post', url:'api/student/receipts',filters:{}},
      ]

    };
  },
  methods: {
    copyNow(content, cont){     
      
       return navigator.clipboard.writeText(content).then(()=> {        
        this.$toast.add({ severity: 'success', summary: 'Copied!', detail: cont, life: 3000000 });
      }, function(err) {
        console.log("Failed to copy to clipboard:", err);
      });
    },
    generateCredentials(){
      this.generating = true
      setTimeout(()=>{
        this.generating = false
        this.apiEnabled = true;     
      },3000)
    }
  },
  mounted() {
    //hljs.highlightAll();
    /* this.highlightedCode = hljs.highlight(
        `  // PHP implementation example
          // Using GuzzleHTTP client to send requests

          use GuzzleHttp\\Client;

          $client = new Client();

          $response = $client->request('GET', 'https://your-api.com/api/university', [
              'headers' => [
                  'Authorization' => 'Bearer YOUR_ACCESS_TOKEN'
              ]
          ]);

          $body = $response->getBody();
          $data = json_decode($body, true);

          var_dump($data)`,
        { language: 'php' }
      ).value */
  },
};
</script>
<style>
  pre {    
      border-radius: 8px;
      overflow-x: auto;
  }
  .p-tabview-nav .p-tabview-title{
    font-size: 0.85em !important;
  }
  .p-tabview .p-tabview-nav {
    border:0px solid transparent !important;
  }
  .p-toast .p-toast-message.p-toast-message-success{
    border:none !important;
    background-color:#ACE1AF !important;
    color:#00693E !important;
  }
  .p-toast .p-toast-message{
    box-shadow: none !important;
    border: 1px solid #00693E;
  }
</style>
<style scoped>
/* @import url("https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/default.min.css"); */

h1, h2, h3 {
    color: #333;
}

/* code {
    font-family: Consolas, monospace;
    background-color: #f0f0f0;
    padding: 2px 5px;
    border-radius: 4px;
}

pre {
    background-color: #f0f0f0;
    padding: 10px;
    border-radius: 8px;
    overflow-x: auto;
}

.endpoint {
    margin-top: 20px;
    padding: 10px;
    background-color: #f0f0f0;
    border-radius: 8px;
}

.endpoint h3 {
    margin-top: 0;
}

.endpoint p {
    margin: 5px 0;
}

.endpoint ul {
    margin-top: 5px;
}

.endpoint li {
    list-style: none;
    margin-bottom: 5px;
}

.endpoint li:before {
    content: '•';
    margin-right: 5px;
}

.endpoint pre {
    background-color: #fff;
    margin-top: 10px;
}
 */
 

</style>