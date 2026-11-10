package com.example.composequadrant

import android.R
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.example.composequadrant.ui.theme.ComposeQuadrantTheme

class MainActivity : ComponentActivity() {
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    enableEdgeToEdge()
    setContent {
      ComposeQuadrantTheme {
        Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
          AppQuadrant(modifier = Modifier.padding(innerPadding))
        }
      }
    }
  }
}

@Composable
fun AppQuadrant(modifier: Modifier) {
  Column(
    modifier = modifier.fillMaxSize()
  ) {
    Row(Modifier.weight(1f)) {
      Quadrant(
        stringResource(com.example.composequadrant.R.string.quadran_1_title),
        stringResource(com.example.composequadrant.R.string.quadrand_1_body_text),
        backgroundColor = Color(0xFFEADDFF),
        modifier = Modifier.weight(1f)
      )
      Quadrant(
        stringResource(com.example.composequadrant.R.string.quadrant_2_titke),
        stringResource(com.example.composequadrant.R.string.quadrant_2_body_text),
        backgroundColor = Color(0xFFD0BCFF),
        modifier = Modifier.weight(1f)
      )
    }
    Row(Modifier.weight(1f)) {
      Quadrant(
        stringResource(com.example.composequadrant.R.string.quadrant_3_title),
        stringResource(com.example.composequadrant.R.string.quadrant_3_body_text),
        Color(0xFFB69DF8),
        modifier = Modifier.weight(1f)
      )
      Quadrant(
        stringResource(com.example.composequadrant.R.string.quadrant_4_title),
        stringResource(com.example.composequadrant.R.string.quadrant_4_body_text),
        Color(0xFFF6EDFF),
        modifier = Modifier.weight(1f)
      )
    }
  }
}

@Composable
fun Quadrant(
  titleText: String,
  bodyText: String,
  backgroundColor: Color,
  modifier: Modifier = Modifier
) {
  Column(
    modifier = modifier
      .fillMaxSize()
      .background(backgroundColor)
      .padding(16.dp),
    verticalArrangement = Arrangement.Center,
    horizontalAlignment = Alignment.CenterHorizontally,
  ) {
    Text(
      text = titleText,
      fontWeight = FontWeight.Bold,
      color = Color.Black,
      modifier = Modifier.padding(bottom = 16.dp)
    )
    Text(
      text = bodyText,
      color = Color.Black,
      textAlign = TextAlign.Justify
    )
  }
}


@Preview(showBackground = true)
@Composable
fun GreetingPreview() {
  ComposeQuadrantTheme {
    AppQuadrant(modifier = Modifier)
  }
}
