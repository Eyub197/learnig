package com.example.composearticle

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.composearticle.ui.theme.ComposeArticleTheme
import org.intellij.lang.annotations.JdkConstants

class MainActivity : ComponentActivity() {
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    enableEdgeToEdge()
    setContent {
      ComposeArticleTheme {
        Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
          Article(modifier = Modifier.padding(innerPadding))
        }
      }
    }
  }
}

@Composable
fun Article(modifier: Modifier = Modifier) {
  val image = painterResource(R.drawable.bg_compose_background)
  Column(modifier = modifier) {
    Image(
      painter = image, contentDescription = null
    )
    Text(
      text = stringResource(R.string.article_title),
      fontSize = 24.sp,
      modifier = Modifier.padding(16.dp)
    )
    Text(
      text = stringResource(R.string.overview),
      textAlign = TextAlign.Justify,
      modifier = modifier.padding(start = 16.dp, end = 16.dp)
    )
    Text(
      text = stringResource(R.string.article_body),
      textAlign = TextAlign.Justify,
      modifier = Modifier.padding(16.dp)
    )
  }
}

@Preview(showBackground = true)
@Composable
fun GreetingPreview() {
  ComposeArticleTheme {
    Article()
  }
}
