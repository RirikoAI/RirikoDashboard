import { Button, Card, Col, Row, Switch } from "antd";
import { RiChatAiLine, RiImageCircleAiLine } from "react-icons/ri";
import { TfiHandOpen } from "react-icons/tfi";
import { ImExit } from "react-icons/im";
import { MdOutlineRecordVoiceOver } from "react-icons/md";
import { PiScanSmileyLight, PiSmileyMelting } from "react-icons/pi";
import { SlPresent } from "react-icons/sl";
import { LuTwitch } from "react-icons/lu";
import React from "react";

export const PluginList: React.FC = () => {
  return (
    <>
      <h2>Artificial Intelligence</h2>
      <Row gutter={ 24 } style={ {marginBottom: 24} }>
        <Col xl={ 6 } lg={ 12 } md={ 12 } sm={ 24 } xs={ 24 } style={ {marginBottom: 24} }>
          <Card title="AI Chatbot" extra={ <Switch defaultChecked/> } bordered={ false }>
            <div className={ "feature-icon" }>
              <RiChatAiLine/>
            </div>
            <p>Chat with a bot that has it's own personality and can learn from your conversations.</p>
            <Button type="primary" onClick={ () => {
            } }>Manage</Button>
          </Card>
        </Col>
        <Col xl={ 6 } lg={ 12 } md={ 12 } sm={ 24 } xs={ 24 } style={ {marginBottom: 24} }>
          <Card title="Stable Diffusion" extra={ <Switch defaultChecked/> } bordered={ false }>
            <div className={ "feature-icon" }>
              <RiImageCircleAiLine/>
            </div>
            <p>Generate images by entering your own prompts.</p>
            <Button type="primary" onClick={ () => {
            } }>Manage</Button>
          </Card>
        </Col>
      </Row>
      
      <h2>General Features</h2>
      <Row gutter={ 24 } style={ {marginBottom: 24} }>
        <Col xl={ 6 } lg={ 12 } md={ 12 } sm={ 24 } xs={ 24 } style={ {marginBottom: 24} }>
          <Card title="Welcome Banner" extra={ <Switch defaultChecked/> } bordered={ false }>
            <div className={ "feature-icon" }>
              <TfiHandOpen/>
            </div>
            <p>Automatically sends the welcome banner to a channel when a new member joins the server.</p>
            <Button type="primary" onClick={ () => {
            } }>Manage</Button>
          </Card>
        </Col>
        <Col xl={ 6 } lg={ 12 } md={ 12 } sm={ 24 } xs={ 24 } style={ {marginBottom: 24} }>
          <Card title="Farewell Banner" extra={ <Switch defaultChecked/> } bordered={ false }>
            <div className={ "feature-icon" }>
              <ImExit/>
            </div>
            <p>Automatically sends the farewell banner to a channel when a member leaves the server.</p>
            <Button type="primary" onClick={ () => {
            } }>Manage</Button>
          </Card>
        </Col>
        <Col xl={ 6 } lg={ 12 } md={ 12 } sm={ 24 } xs={ 24 } style={ {marginBottom: 24} }>
          <Card title="Auto Voice Channel" extra={ <Switch defaultChecked/> } bordered={ false }>
            <div className={ "feature-icon" }>
              <MdOutlineRecordVoiceOver/>
            </div>
            <p>Automatically creates a voice channel when a member joins a specific voice channel.</p>
            <Button type="primary" onClick={ () => {
            } }>Manage</Button>
          </Card>
        </Col>
        <Col xl={ 6 } lg={ 12 } md={ 12 } sm={ 24 } xs={ 24 } style={ {marginBottom: 24} }>
          <Card title="Memes" extra={ <Switch defaultChecked/> } bordered={ false }>
            <div className={ "feature-icon" }>
              <PiScanSmileyLight/>
            </div>
            <p>Generate memes with a simple command.</p>
            <Button type="primary" onClick={ () => {
            } }>Manage</Button>
          </Card>
        </Col>
        <Col xl={ 6 } lg={ 12 } md={ 12 } sm={ 24 } xs={ 24 } style={ {marginBottom: 24} }>
          <Card title="Reactions" extra={ <Switch defaultChecked/> } bordered={ false }>
            <div className={ "feature-icon" }>
              <PiSmileyMelting/>
            </div>
            <p>Easily generate random reaction GIFs with a simple command.</p>
            <Button type="primary" onClick={ () => {
            } }>Manage</Button>
          </Card>
        </Col>
        <Col xl={ 6 } lg={ 12 } md={ 12 } sm={ 24 } xs={ 24 } style={ {marginBottom: 24} }>
          <Card title="Giveaways" extra={ <Switch defaultChecked/> } bordered={ false }>
            <div className={ "feature-icon" }>
              <SlPresent style={ {padding: 10} }/>
            </div>
            <p>Run giveaways and drops in your server.</p>
            <Button type="primary" onClick={ () => {
            } }>Manage</Button>
          </Card>
        </Col>
      </Row>
      
      <h2>Stream Alerts</h2>
      <Row gutter={ 24 } style={ {marginBottom: 24} }>
        <Col xl={ 6 } lg={ 12 } md={ 12 } sm={ 24 } xs={ 24 } style={ {marginBottom: 24} }>
          <Card title="Twitch Stream Notification" extra={ <Switch defaultChecked/> } bordered={ false }>
            <div className={ "feature-icon" }>
              <LuTwitch/>
            </div>
            <p>Subscribe to a Twitch streamer and get notified when they go live.</p>
            <Button type="primary" onClick={ () => {
            } }>Manage</Button>
          </Card>
        </Col>
      </Row>
    </>
  )
}